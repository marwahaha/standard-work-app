import { formatTime } from './formatTime'

it('formats time', () => {
  expect(formatTime(33)).toEqual('0:33')
  expect(formatTime(5)).toEqual('0:05')
  expect(formatTime(94)).toEqual('1:34')
  expect(formatTime(2)).toEqual('0:02')
  expect(formatTime(43)).toEqual('0:43')
})
