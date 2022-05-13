import client from "../database";

export interface order {
    name : string,
    price: number,
} 
    
export class productStore{
    async indexProduct():Promise<order[]> {
        try{
            const conect = await client.connect()
            const sql = 'SELECT * FROM products';
            const result = await conect.query(sql)
            conect.release()            
            return result?.rows
        }
        catch(err){
            console.log(err);
            throw new Error(`cannot get products ${err}`)
        }
    }
    async show(id:number):Promise<order[]> {
        try{
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conect = await client.connect()
            const result = await conect.query(sql,[id])
            conect.release()            
            return result?.rows[0]
        }
        catch(err){
            console.log(err);
            throw new Error(`cannot get products ${err}`)
        }
    }
    async create(body:{[key:string]:string}):Promise<order[]> {
        try{
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            const conect = await client.connect()
            const result = await conect.query(sql,[body.name, body.price])
            conect.release()            
            return result?.rows[0]
        }
        catch(err){
            console.log(err);
            throw new Error(`cannot get products ${err}`)
        }
    }
}