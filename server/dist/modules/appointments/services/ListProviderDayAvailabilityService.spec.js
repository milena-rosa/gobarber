"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderDayAvailability;
describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the day availability of a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 20, 11).getTime());
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, // past
    {
      hour: 9,
      available: false
    }, // past
    {
      hour: 10,
      available: false
    }, // past
    {
      hour: 11,
      available: false
    }, // past
    {
      hour: 13,
      available: true
    }, {
      hour: 14,
      available: false
    }, // taken
    {
      hour: 15,
      available: false
    }, // taken
    {
      hour: 16,
      available: true
    }]));
  });
});