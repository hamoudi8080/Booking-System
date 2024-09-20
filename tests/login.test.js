import { expect } from 'chai';
import axios from 'axios';
 

describe('login intergration api test', () => {
  it('should log in successfully with correct credentials', async () => {

    const res = await axios.post('http://localhost:4000/login', {

      email: 'hamo@outlook.com',
      password: '12345'

    });

    console.log(res.data);
    expect(res.status).to.equal(200);
    expect(res.data).to.deep.include({ name: 'hamo' }); // Check the data property
  });
});
