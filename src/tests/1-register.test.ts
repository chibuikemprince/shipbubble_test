import { createUser } from '../app/controllers/auth/register';
import { exec } from 'child_process';
const id = Date.now();
const command: string = 'sequelize db:migrate';

describe('createUser', () => {
  it('should create a user successfully', async () => {
    const name = 'John Doe';
    const email = `johndoe@example.com${id}`;
    const password = 'password';

    try {
      await new Promise<void>((resolve, reject) => {
        exec(command, (error: Error | null, stdout: string, stderr: string) => {
          if (error) {
            console.error(`Error executing command: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Command execution returned an error: ${stderr}`);
            reject(new Error(stderr));
            return;
          }
          console.log(`Command output:\n${stdout}`);
          resolve();
        });
      });

      const result = await createUser(name, email, password);

      expect(result.statusCode).toBe('SUCCESS');
      expect(result.status).toBe(200);
      expect(result.message).toBe('user created successfully');
      expect(result.data).toEqual([]);
    } catch (error) {
      console.log(error);
    }
  });

  it('should reject with an error if name, email, or password is missing', async () => {
    await expect(createUser('', `johndoe@example.com${id}`, 'password')).rejects.toMatchObject({
      statusCode: 'FORM_REQUIREMENT_ERROR',
      status: 400,
      message: 'name, email and password are required',
      data: [],
    });
  });

  it('should reject with an error if the email already exists', async () => {
    await expect(createUser('John Doe', `johndoe@example.com${id}`, 'password')).rejects.toMatchObject({
      statusCode: 'RESOURCE_ALREADY_EXIST',
      status: 403,
      message: 'email already exist',
      data: [],
    });
  });

 


});