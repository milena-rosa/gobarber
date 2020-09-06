"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '1234567890'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567890');
  });
  it('should not be possible to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 13);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be possible to create an appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 6, 10, 12).getTime());
    await expect(createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 10, 11)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be possible to create an appointment with equal customer and provider ids', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 6, 10, 12).getTime());
    await expect(createAppointment.execute({
      provider_id: 'provider',
      user_id: 'provider',
      date: new Date(2020, 6, 10, 13)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be possible to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 6, 10, 12).getTime());
    await expect(createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 11, 7)
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 6, 11, 18)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});