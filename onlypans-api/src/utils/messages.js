const MESSAGE = {
  GENERIC: `Something went horribly wrong. It's not your fault, we promise!`,
  NOT_FOUND: (resource, value) => ({
    message: `${resource} not found`,
    reason: `${resource} with id ${value} does not exist`
  }),
  INVALID_PARAMETER: (parameter, name, type) => ({
    message: `Invalid parameter '${parameter}'`,
    reason: `Parameter '${name}' must be of type '${type}'`
  }),
  INVALID_QUERY_PARAMETER: (parameter, name, type) => ({
    message: `Invalid query parameter '${parameter}'`,
    reason: `Query parameter '${name}' must be of type '${type}'`
  }),
  MISSING_PARAMETERS: (names = []) => ({
    message: 'Missing parameter',
    reason: `Body must contain parameters: ${names.join(', ')}`
  }),
  CUSTOM: (message, reason = '') => ({
    message,
    reason
  })
}

export default MESSAGE;