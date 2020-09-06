"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it('should be able to update an users avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png'
    });
    expect(user.avatar).toBe('avatar.png');
  });
  it('should not be able to update the avatar of a non existent user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non_existent_user',
      avatar_filename: 'avatar.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete the old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.png'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});