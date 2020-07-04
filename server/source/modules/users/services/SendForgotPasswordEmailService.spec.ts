import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using its email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fulano@fulano.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password of a non existent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'fulano@fulano.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a token to recover the password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fulano@fulano.com.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
