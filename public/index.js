import GetHighestFactor from "./GetHighestFactor.js"
import GetLowestFactor from "./GetLowestFactor.js"

const Limit = 100000

const Page = window.Page = {
  Limit
  , primes : undefined
  , prime_keys : {}
  , numbers : []
}

const worker = new Worker("prime.worker.js")

worker.onmessage = function (message) {
  Page.primes = message.data
  Page.primes.forEach( value => Page.prime_keys[ value ] = true)

  let x = 0

  const getLowestFactor = GetLowestFactor(Page)

  for (x = 0; x < Limit; x++) {

    let factors = !x ? x : getLowestFactor( x )

    // Page.numbers.push()

  //   // let num = x > 3 ? getHighestFactor(x) : 1

    Page.numbers.push({
      x
      , factors
      , is_prime : x === factors[ 0 ]
    })

  }

  console.log(Page)


}

worker.postMessage(Limit)