import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update an users avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update the avatar of a non existent user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non_existent_user',
        avatar_filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
