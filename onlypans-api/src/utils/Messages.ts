const MESSAGE = Object.freeze({
  GENERIC: `Something went horribly wrong. It's not your fault, we promise!`,
  NOT_FOUND: (resource: string, value: string | number) => ({
    message: `${resource} '${value}' not found`
  }),
  INVALID_PARAMETER: (parameter: string, name: string, type: string) => ({
    message: `Invalid parameter '${parameter}'`,
    reason: `Parameter '${name}' must be of type '${type}'`
  }),
  INVALID_QUERY_PARAMETER: (parameter: string, name: string, type: string) => ({
    message: `Invalid query parameter '${parameter}'`,
    reason: `Query parameter '${name}' must be of type '${type}'`
  }),
  MISSING_PARAMETERS: (names = []) => ({
    message: 'Missing parameter',
    reason: `Body must contain parameters: ${names.join(', ')}`
  }),
  CUSTOM: (message: string, reason?: string) => ({
    message,
    reason
  })
});

export default MESSAGE;