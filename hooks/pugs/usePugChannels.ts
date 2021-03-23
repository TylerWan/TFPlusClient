import useSWR from 'swr'
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function usePugChannel() {
	const { data, error } = useSWR(()=> 'http://localhost:8080/api/pug/channels/waiting', fetcher)
	return {
		members: data,
		isLoading: !error && !data,
		isError: error
	}
}
