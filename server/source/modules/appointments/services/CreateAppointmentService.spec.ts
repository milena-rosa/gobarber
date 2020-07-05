import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '1234567890',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567890');
  });

  it('should not be possible to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to create an appointment in a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2020, 6, 10, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to create an appointment with equal customer and provider ids', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'provider',
        date: new Date(2020, 6, 10, 13),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to create an appointment before 8am and after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2020, 6, 11, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2020, 6, 11, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
