# Performance Attribution

## What is it ?
It is a technique used to quantify the excess return of a portfolio over its benchmark into
the active decisions of the investment decision process.

Performance return attribution along with risk analysis allows the analyst to *understand the
sources of return in the portfolio* and to communicate that understanding to stakeholders.

## Brinson Arithmetic Attribution
Based on the assumptions that returns in the portfolio can be disaggregated into the sum of the
returns of their parts.

```
Portfolio Return r = w1*r1 + w2*r2 + .... + wn*rn

wi: Weight of the portfolio in the ith asset class
ri: Return of the portfolio assets in the ith asset class

w1+w2+...+wn = 1

Benchmark Return b = W1*b1 + W2*b2 + ...... + Wn*bn

wi: Weight of the benchmark in the ith asset class
ri: Return of the benchmark assets in the ith asset class

W1+W2+...+Wn = 1
```

The objective of attribution is to quantify each of the portfolio manager's active decisions
that contribute to the difference between the portfolio return r and benchmark return b.

The standard investment decision process is where the portfolio manager adds value through
**asset allocation** and **security selection**.

### Asset Allocation
In asset allocation, the portfolio manager seeks to add value by taking different asset
category weights in the portfolio than the category weights of the benchmark. A higher 
weight in a category in the portfolio would make that category *overweight* and a lower 
weight would make the category *underweight*.

A good portfolio manager would end up overweight in good performing categories and
underweight in poor performing categories.

To quantify the value add from asset allocation we calculate the return of a notional 
intermediate fund. This is done by applying the category weights of the portfolio to the
benchmark returns of each category. This notional fund by definition will reflect the 
impact of the portfolio manager's allocation bets on each asset category but will eliminate
any selection effect since we're using the benchmark's category returns

```
Allocation Notional intermediate fund return:    

bs = w1*b1 + w2*b2 + ..... + wn*bn

Contribution from Asset Allocation: 

bs - b = (w1 - W1)*b1 + (w2 - W2)*b2 + ..... + (wn - Wn)*bn
    
Contribution to Asset Allocation from ith category:

Ai = (wi - Wi)*bi

bs - b = A1 + A2 + ...... + An
```

### Security Selection
In Security Selection the portfolio manager will seek to add value by selecting individual
securities within an asset category.

A good security selector would aim to be overweight in good performing securities and 
underweight in poor performing securities.

To quantify the value add from security selection we calculate the return of another 
notional intermediate fund that's formed by applying the benchmark weights to the 
category returns achieved in the actual portfolio

```
Selection Notional intermediate fund return:

rs = W1*r1 + W2*r2 + ...... + Wn*rn

Contribution from Stock Selection:

rs - b = (r1 - b1)*W1 + (r2 - b2)*W2 + ...... + (rn - bn)*Wn

Contribution to Stock Selection from the ith category

Si = (ri - bi)*Wi

rs - b = S1 + S2 + ...... + Sn
``` 

### Interaction
In the classical Brinson model, asset allocation and stock selection do not explain the arithmetic excess return
of the portfolio completely. Therefore a third (residual) term is added called *interaction*.

This is defined as 

```
Interaction: r - rs - bs - b

Interaction: (w1 - W1)*(r1 - b1) + (w2 - W2)*(r2 - b2) + ........ + (wn - Wn)*(rn - bn)

Contribution to Interaction from the ith category

Ii = (wi - Wi)*(ri - bi)
```

While this *classical* model successfully explains the excess returns achieved by a portfolio over it's 
benchmark, what we need is a model that rewards a portfolio manager not for being overweight in positive returning
asset categories, but for being overweight in a category whose return exceeds that of the benchmark. In
other words, the manager would lose value if they were overweight in a positive returning sector but one whose
return was nevertheless lower than the benchmark's overall return. 

So what we need is a model that rewards or punishes the manager for their allocation decisions in sectors whose
returns are greater than the overall benchmark return. That way if they were overweight in a sector whose returns
were positive but lower than the benchmark, they would get a negative allocation factor from that sector and 
vice versa.

## Brinson Fachler Arithmetic Attribution
The allocation factor is modified in this model to the following

```
bs - b = (w1 - W1)*b1 + (w2 - W2)*b2 + ....... + (wn - Wn)*bn
       
       = (w1 - W1)*b1 + (w2 - W2)*b2 + ....... + (wn - Wn)*bn - (w1 - W1)*b - (w2 - W2)*b - ....... - (wn - Wn)*b
       
       =  (w1 - W1)*(b1 - b) + (w2 - W2)*(b2 - b) + ....... + (wn - Wn)*(bn - b)
      
Since w1 + w2 +.... + wn = W1 + W2 + ..... + Wn = 1
      (w1 - W1) + (w2 - W2) + ....... + (wn - Wn) = 0
      (w1 - W1)*b + (w2 - W2)*b + ....... + (wn - Wn)*b = 0
```

This way, you get a category with a positive contribution to allocation only if there was an overallocation (overweight)
in an outperforming category and an under allocation (under weight) in an under performing category.


### Interaction
In the modified model, often times the Interaction component is merged in with the Selection effect. This is 
because Interaction is not intuitively explainable and more importantly portfolio managers or asset allocators
do not think about maximizing interaction when going through the investment process. 

To do this, the modified Selection effect can be calculated by substituing the benchmark weight with the actual
portfolio weight for each asset category

```
Si = wi*(ri - bi)
```

Intuitively this can be thought of as the asset allocation decision being made as a first step followed by 
decisions on security selection. So you use the portfolio weights to weight the difference in return of each
category to get a total selection effect (selection + interaction).


## Geometric Attribution

Calculating the Geometric Attribution is similar to arithmetic except that Geometric Attribution seeks to explain
the Geometric Excess return of the portfolio over its benchmark.

Strictly speaking it is a bit of a hybrid because with Geometric attribution the allocation and selection 
components of each category *sum* to the overall Allocation and Selection effects of the portfolio. In a pure
Geometric model you would expect the individual category components to **compound** to the overall portfolio 
components.

### Allocation

```
Ai = (wi - Wi) * (((1 + bi) / (1 + b)) - 1)

A = A1 + A2 + ..... + An
 
  = ((1 + bs)/(1 + b)) - 1
```

### Selection

```
Si = wi * (((1 + ri)/(1 + bi)) -1)) * (1 + bi)/(1 + bs)

S = S1 + S2 + ..... + Sn

  = ((1 + r)/(1 + bs)) - 1
```

The total Security selection and Asset allocation effects compound together to produce the Geometric Excess
Return

```
((1 + r)/(1 + bs) * (1 + bs)/(1 + b)) - 1  = ((1 + r)/(1 + b)) -1 
```

## Attribution effects for rate of return methodologies
Attribution methods described above use the central assumption that the returns of the portfolio can be 
disaggregated into the returns of the individual categories and that the weights of the investments in each 
categories sum up to 1.

Thus attribution will only work for rate of return methodologies that support disaggregation. eg the *excess returns for the IRR method
that assumes a single return throughout the measurement period cannot be explained by attribution*.