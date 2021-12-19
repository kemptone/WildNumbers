import GetLowestFactor from "./GetLowestFactor.js"

const Limit = 10000

const Page = window.Page = {
  Limit
  , primes : undefined
  , prime_keys : {}
  , numbers : []
  , e_numbers : document.querySelector("#numbers")
}


const worker = new Worker("prime.worker.js")

worker.onmessage = function (message) {
  Page.primes = message.data
  Page.primes.forEach( value => Page.prime_keys[ value ] = true)

  let x = 0

  const getLowestFactor = GetLowestFactor(Page)

  for (x = 1; x <= Limit; x++) {
    let factors = !x ? [ x ] : getLowestFactor( x ) 
    Page.numbers.push({
      x
      , factors
      , is_prime : x === factors[ 0 ]
    })
  }

  console.log(Page)

  buildList(Page)

}

const replaceThese = [
    [ "2 x 2 x 2 x 2 x 2 x 2 x", "64 x" ]
  , [ "2 x 2 x 2 x 2 x 2 x", "32 x" ]
  , [ "2 x 2 x 2 x 2 x", "16 x" ]
  , [ "2 x 2 x 2 x", "8 x" ]
  , [ "2 x 2 x", "4 x" ]
  , [ "3 x 3 x", "9 x" ]
]

const BuildItem = (Page, fragment) => ({ x, factors, is_prime }) => {

  console.count("buildItem")

  const child = document.createElement("div")
  const b = document.createElement("b")
  const em = document.createElement("em")
  const i = document.createElement("i")

  b.innerHTML = x

  if (is_prime)
    em.innerHTML = "prime"
  else {
    if (factors[0] === 2 || factors[0] === 3) {
      let str = factors.join(" x ")
      replaceThese.forEach( i => str = str.replace(
        new RegExp( `${ i[0] }`, 'g' )
        , i[1]
      ))
      em.innerHTML = str
    } else {
      em.innerHTML = `${ factors.join(" x ") }`
    }
  }

  // if (is_prime)
  //   i.innerHTML = "prime"

  child.appendChild( em )
  child.appendChild( b )
  // child.appendChild( i )

  fragment.appendChild( child )

}

const buildList = Page => {
  const fragment = document.createDocumentFragment()
  Page.numbers.forEach( BuildItem(Page, fragment) )
  Page.e_numbers.appendChild( fragment )
}

worker.postMessage(Limit)