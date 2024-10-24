const valid_url = () => {

}

const valid_method = () => {
    
}


export class Axios {
    private url: string;
    private data: any;

    constructor(url: string, data?: any) {
        this.url = url;
        this.data = data
    }

    public get = async (): Promise<unknown | null> => {
        try {
            const response = await fetch(this.url)
            if(!response.ok) {
                throw new Error(`Invalid response status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch(error) {
            console.log('Error fetching data:', error)
            return null
        }
    }
}