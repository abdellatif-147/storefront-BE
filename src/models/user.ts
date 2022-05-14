import bcrypt from 'bcrypt';
import Client from '../database';

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}
const pepper = process.env?.BCRYPT_PASSWORD;
const saltRounds = process.env?.SALT_ROUND as string;

export class userModel {
  async signUp(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, userName, password_digest) VALUES($1, $2, $3, $4) RETURNING firstName,lastName,userName';

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.userName,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      console.log(err);
      throw new Error(`unable create user (${u.userName}): ${err}`);
    }
  }

  async login(userName: string, password: string): Promise<{} | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT userName, password_digest FROM users WHERE userName=($1)';

      const result = await conn.query(sql, [userName]);
      console.log(password + pepper);

      if (result.rows?.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          delete user.password_digest;
          return user;
        }
      }

      return null;
    } catch (err) {
      console.log(err);
      throw new Error(`unable to login: ${err}`);
    }
  }
  async show(id:number):Promise<User> {
    try{
      const sql = 'SELECT userName, firstName, lastName FROM users WHERE id=($1)';
      const conect = await Client.connect();
      const result = await conect.query(sql,[id]);      
      conect.release();
      return result.rows[0];
    }
    catch(err){
      console.log(err);
      throw new Error(`cannot get user ${err}`);
    }
  }
  async indexUsers(): Promise<User[]> {
    try {
      const conect = await Client.connect();
      const sql = 'SELECT username, firstname, lastname FROM users';
      const result = await conect.query(sql);      
      conect.release();
      return result.rows
    } catch (err) {
      throw new Error(`cannot get users ${err}`);
    }
  }
}
