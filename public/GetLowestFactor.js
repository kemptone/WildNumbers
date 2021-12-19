export default ({ primes, prime_keys, Limit }) => number => {

  let ret = []

  function getLowest (number, ret) {

    // if it's prime, return the number
    if (prime_keys[ number ]) {
      ret.push( number )
      return
    }

    let cursor = 0

    while (cursor < Limit) {

      if (number % primes[ cursor ] === 0)
        break

      cursor++

    }

    const value = primes[ cursor ]
    ret.push( value )
    getLowest( number / value, ret )

  }

  // return getLowest(number, ret)

  if (number === 1)
    return [ 1 ]

  getLowest(number, ret)

  return ret

}