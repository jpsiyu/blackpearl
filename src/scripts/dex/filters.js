import Vue from 'vue'
import BigNumber from 'bignumber.js'

Vue.filter('unit', function (val) {
  if (!val) return '0.000'
  const valBN = BigNumber(val)
  const valUnit = valBN.dividedBy(10 ** 18)
  const valStr = valUnit.toFixed()
  return valStr
})