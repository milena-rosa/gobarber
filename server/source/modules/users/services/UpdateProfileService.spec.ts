import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Siclano',
      email: 'siclano@fulano.com.br',
    });

    expect(updatedUser.name).toBe('Siclano');
    expect(updatedUser.email).toBe('siclano@fulano.com.br');
  });

  it('should not be able to update the profile of an inexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'inexistent-user',
        email: 'inexistent@user.com',
        name: 'none',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the email to an already registered email', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Sicrano',
        email: 'fulano@fulano.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Siclano',
      email: 'siclano@fulano.com.br',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without sending the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Siclano',
        email: 'siclano@fulano.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password by sending a wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Siclano',
        email: 'siclano@fulano.com.br',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
