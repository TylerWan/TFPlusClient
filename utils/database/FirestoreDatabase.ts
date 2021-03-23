import Emittery from "emittery";
import {Singleton} from "../Singleton";

@Singleton
export class CustomFirestoreDatabase {
	
	private _PlayerProfilesCollection: any;
	
	//Direct database object
	private _db: any;
	
	//Active Account listeners
	private _accountHasListener: any = {};
	
	//Accounts by ID
	private _accounts: any = {};
	
	//If database is established
	public isInitialized = false;
	
	public async initDb(db: any) {
		if (this._db) {
			console.log('already set!!')
		} else {
			this._db = db;
			
			this._PlayerProfilesCollection = this._db.collection('PlayerProfiles');
			const accountSnap = await this._PlayerProfilesCollection.get();
			accountSnap.forEach((account: any) => {
				this._accounts[account.id] = account.data();
			})
			
			this.isInitialized = true;
			console.log('inited!')
			
		}
		return this._db;
	}
	
	public getDb() {
		return this._db;
	}
	
	public getLocalAccountByIdType(idType: IdType, id: string) {
		console.log('tryin to get')
		console.log(id)
		console.log(idType)
		let currentAccounts = this._accounts;
		console.log('current local')
		console.log(this._accounts)
		let accountIds = Object.keys(currentAccounts);
		for (let idIndex in accountIds) if (accountIds.hasOwnProperty(idIndex)) {
			let accountId = accountIds[idIndex];
			let accountInfo = currentAccounts[accountId];
			switch (idType) {
				case IdType.STEAM_ID: {
					if (accountInfo?.steamid === id) {
						this.setLastRead(accountId);
						return {accountInfo, accountId};
					}
				}
					break;
				
				case IdType.DISCORD_ID: {
					if (accountInfo?.discordid === id) {
						this.setLastRead(accountId);
						return {accountInfo, accountId};
					}
				}
					break;
				
				case IdType.PROFILE_ID: {
					if (accountId === id) {
						this.setLastRead(accountId);
						return {accountInfo, accountId};
					}
				}
					break;
				
				case IdType.AUTH_KEY: {
					if (accountInfo?.authkeys?.includes(id)) {
						this.setLastRead(accountId);
						return {accountInfo, accountId};
					}
				}
				
			}
		}
		if (idType === IdType.PROFILE_ID) {
			return {undefined, id};
		}
		return undefined;
	}
	
	private setLastRead(accountId: string) {
		if (this.isInitialized) {
			this._accounts[accountId].lastread = new Date();
		}
	}
	
	
	public getAccount(idType: IdType, id: string) {
		console.log('get account')
		console.log(idType)
		console.log(id)
		if (!this._PlayerProfilesCollection || !this.isInitialized) {
			console.log(this._PlayerProfilesCollection)
			console.log(this.isInitialized)
			console.log('not initialized')
			return undefined;
		}
		
		let currentDate = new Date();
		
		//Check local data
		let foundAccount = this.getLocalAccountByIdType(idType, id);
		console.log('found')
		console.log(foundAccount)
		let accountId = foundAccount?.accountId;
		let localAccount = foundAccount?.accountInfo;
		//If user not available locally or doesnt have listener, initialize listener
		if (!!accountId && (!foundAccount || !this._accountHasListener[accountId])) {
			this.getSnapshot(this._PlayerProfilesCollection, accountId, (snapshot: any, listener: any) => {
				let accountId = snapshot?.id;
				
				//Mark as listening if not already
				if (!this._accountHasListener[accountId] || this._accountHasListener === 1) {
					this.setAccountListener(accountId);
				}
				
				//User not available
				if (!snapshot || !snapshot.exists || !snapshot.data() || this._accountHasListener[accountId] > 1) {
					listener();
					this.removeAccountListener(accountId);
				}
				
				//Save player locally
				if (accountId) {
					this.storeLocalPlayer(snapshot.data(), accountId);
				}
				
				//Break subscription if not recently read
				if (localAccount?.lastread) {
					let lastRead = new Date(localAccount?.lastread);
					console.log(minutesBetweenDates(lastRead, currentDate))
					if (minutesBetweenDates(lastRead, currentDate) > 10) {
						console.log('unsubbing');
						listener();
						this.removeAccountListener(accountId)
					}
				}
				
				return {
					accountInfo: snapshot.data(),
					accountId
				};
				
			}, (err: any) => {
				this.removeAccountListener(accountId)
			}).then((r: any) => {
			});
		} else if (localAccount && accountId) {
			//user is available locally
			this.setLastRead(accountId);
			return {
				accountInfo: localAccount,
				accountId
			};
		}
		return {
			accountInfo: localAccount,
			accountId
		};
	}
	
	public findAccount(options: any) {
		let account: any;
		if (this.isInitialized && !!options) {
			if (options.accountid) {
				account = this.getAccount(IdType.PROFILE_ID, options.accountid);
				if (!!account) {
					return account;
				}
			}
			if (options.steamid) {
				account = this.getAccount(IdType.STEAM_ID, options.steamid);
				if (!!account) {
					return account;
				}
			}
			if (options.discordid) {
				account = this.getAccount(IdType.DISCORD_ID, options.discordid);
				if (!!account) {
					return account;
				}
			}
			if (options.authkey) {
				account = this.getAccount(IdType.AUTH_KEY, options.authkey);
				if (!!account) {
					return account;
				}
			}
		}
		return account;
	}
	
	private storeLocalPlayer(accountInfo: any, accountId: string) {
		if (!this._accounts) {
			this._accounts = {};
		}
		this._accounts[accountId] = accountInfo;
	}
	
	public savePlayer(accountInfo: any, accountId: any) {
		if (this.isInitialized) {
			accountInfo.accountId = accountId;
			let account = this.findAccount(accountInfo);
			if (!!account?.accountId && !!accountInfo) {
				accountInfo.accountId = account.accountId;
				if (!!accountInfo.authkey && !!account.authkeys) {
					let authkey = accountInfo.authkey
					delete accountInfo.authkey;
					accountInfo.authkeys = account.authkeys;
					accountInfo.authkeys.push(authkey);
				}
				return this._PlayerProfilesCollection.doc(account.accountId).set(accountInfo, {merge: true});
			}
		}
		return undefined;
	}
	
	//Set off snapshot
	private async getSnapshot(reference: any, docId: string, snapshotCallback: any, errorCallback: any) {
		const listener = reference.doc(docId).onSnapshot((docSnapshot: any) => {
			snapshotCallback(docSnapshot, listener)
		}, (err: any) => {
			console.log(`Encountered error: ${err}`);
			errorCallback(err);
		});
	}
	
	private setAccountListener(accountId: string) {
		if (!this._accountHasListener) {
			this._accountHasListener = {};
			this._accountHasListener[accountId] = 0;
		}
		return this._accountHasListener[accountId] = this._accountHasListener[accountId] + 1;
	}
	
	private removeAccountListener(accountId: string | undefined) {
		console.log('removing' + accountId);
		if (!!accountId && this._accountHasListener && this._accountHasListener[accountId]) {
			delete this._accountHasListener[accountId];
		}
		return this._accountHasListener
	}
	
	
}


function minutesBetweenDates(date1: any, date2: any) {
	if (date1 && date2) {
		return Math.abs(date1 - date2) / 1000 / 60;
	}
	return 0;
}


export enum IdType {
	STEAM_ID,
	DISCORD_ID,
	PROFILE_ID,
	AUTH_KEY
}


