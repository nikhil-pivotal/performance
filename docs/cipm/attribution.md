# Attribution

A set of techniques to identify the sources of the excess return of a portfolio against its benchmark in order to understand
and evaluate the consequences of active investment decisions.

In other words, if an actively managed portfolio beat or lagged its benchmark, attribution would provide insights into 
what decisions made by the portfolio manager caused that to happen. These insights are provided by two main dimensions

## Allocation
The value the portfolio manager adds by having different sector weights in the portfolio than the sector weights of the 
benchmark. A sector weight in the portfolio that's greater than the corresponding sector's weight in the benchmark is
described as `overweight`, while a portfolio sector weight less than the benchmark sector is said to be `underweight`.

## Selection
This is the value the portfolio manager adds by holding different securities in the sector than the benchmark does.

Overall, Attribution describes the excess return produced by an actively managed portfolio as a linear combination of the
Allocation and Selection effect.


## Arithmetic Equity Return Attribution

Seeks to explain excess return denoted by `R - B`  (Porfolio return - Benchmark return).


Portfolio and Benchmark returns can be broken down into their components as follows

```
Portfolio Return R = Sigma(i, n)wiRi

Benchmark Return B = Sigma(i, n)WiBi

Sigma(i, n)wi = Sigma(i, n)Wi = 1

wi: Weight of the ith sector in the portfolio
Wi: Weight of the ith sector in the benchmark
Ri: Return of the portfolio assets in the ith sector
Bi: Return of the benchmark assets in the ith sector
n: Number of secturities
```

### Brinson Hood Beebower Model

#### Allocation
BHB describes the allocation effect as follows

```
Ai = (wi - Wi)Bi

Sigma(i, n)Ai = Bs - B
Sigma(i, n)(wi - Wi)Bi = Bs - B
 
Ai: The allocation effect in the ith sector
Bi: The Benchmark return in the ith sector
Bs: Sigma(i, n)wiBi. A notional portfolio created by applying the portfolios weights to the benchmarks returns in the ith
sector
```

#### Selection
The selection effect is isolated as follows

```
Si = Wi(Ri - Bi)

Sigma(i, n)Si = Rs - B

Si: The selection effect in sector i
Rs: Sigma(i, n)WiRi. A notional portfolio created by applying the benchmark's weights in each sector to the portfolio's 
returns for that sector.
```

#### Interaction
This is the effect produced by the combination of the allocation and selection decisions and is calculated as

```
Sigma(i, n)(wi - Wi)(Ri - Bi)  

which is the sum of the difference in weight multiplied by the difference in return for the ith sector

or

R - Rs - Bs + B
```

Interaction is not a residual amount, but can be directly calculated using the formula above.


### Brinson Fachler Model

Differs from Brinson Hood Beebower only in the way the allocation effect is calculated. Seeks to provide a more `relative`
sign to the sector returns. i.e. In BHB, over weighting a sector that provided a positive return produces a positive allocation 
effect, despite the benchmark return outperforming the portfolio for that sector. And vice versa for negative sector returns.

The BF model seeks to calculate the sector allocation effect more in terms of whether the portfolio outperformed or underperformed
relative to the benchmark, rather than the standalone sector performance.


#### Allocation Effect

BF modifies the allocation effect formula form BHB as follows

```
Ai = (wi - Wi)(Bi - B)

Bs - B = Sigma(i, n)(wi - Wi)(Bi - B)
```
*You can add the constant B (overall benchmark return) to the BHB equation because Sigma(i, n)wiB - Sigma(i, n)WiB will 
cancel out, since the sum of weights wi and Wi both add up to 1.*


#### Selection and interaction effect
The same as BHB



## Geometric Return Attribution

Seeks to describe Geometric excess return which is defined as 

```
(1 + R)/(1 + B) - 1
```

### Allocation Effect

The allocation effect for Geometric return is calculated as

```
Ai = (wi - Wi)(((1 + Bi)/(1 + B)) - 1)

Sigma(i, n)Ai = ((1 + Bs)/(1 + B)) - 1
```

### Selection Effect

```
Si = wi(((1+Ri)/(1+Bi)) - 1)((1 + Bi)/(1 + Bs))
Sigma(i, n)Si = ((1+R)/(1+Bs)) - 1
```
