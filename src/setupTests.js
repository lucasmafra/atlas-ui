// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { tap, tapd } from './common-js/debug'
global.tap = tap
global.tapd = tapd
require('jest-fetch-mock').enableMocks()

beforeEach(() => jest.clearAllMocks())
