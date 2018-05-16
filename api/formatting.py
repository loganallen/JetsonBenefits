THOUSAND          = 1000
HUNDRED_THOUSAND  = 100000
ONE_MILLION       = 1000000
TEN_MILLION       = 10000000

def num_to_string(num):
  """
    num_to_string returns string representation of number
    Note: will add commas
    : param num: the number to convert
    : return --> correctly formatted string
  """
  if (type(num) in [float, int]):
    return "{:,}".format(num)

def num_to_decimal(num, places):
  """
    num_to_decimal: returns string representation of decimal number with _ decimal places
    Note: will add commas
    : param num: the number to convert
    : return --> correctly formatted string
  """
  if (type(num) in [float, int]):
    formatter = '{0:,.' + str(places) + 'f}'
    return formatter.format(num)

def num_to_usd(num):
  """
    num_to_usd: returns string representation of dollar amount
    Node: will add commas
    : param num: the number to convert
    : return --> correctly formatted usd string
  """
  temp = num_to_decimal(num, 2)
  if temp[-2] + temp[-1] == '00':
    return '$' + temp[:-3]
  else:
    return '$' + temp

def abbrev_num(num):
  """
    abbrev_num: returns abbreviated version of number
    : param num: the number to convert
    : return --> correctly formatted usd string
    Examples:
      Less than 100 thousand
      150 -> 150, 1240 -> 1,240
      15060 -> 15.05K

      Between 100K and 1M
      150021 -> 150K
      150299 -> 150.2K

      Between 1M and 10M
      1200000 -> 

      Everything else

  """
  # only abbreviate numbers greater than 100K
  if num < HUNDRED_THOUSAND:
    return num_to_usd(num)

  # numbers between 100K and 1M
  if num < ONE_MILLION:
    # cast to float 
    dec = float(num) / THOUSAND
    rep = num_to_decimal(dec, 1)
    if rep[-1] == '0':
      return rep[:-2] + 'K'
    else:
      return num_to_decimal(dec, 1) + 'K'
  
  # numbers between 1M and 10M
  if num < TEN_MILLION:
    dec = float(num) / ONE_MILLION
    rep = num_to_decimal(dec, 1)
    if rep[-1] == '0':
      return rep[:-2]
    else:
      return num_to_decimal(dec, 1) + 'M'

  # every other number will be in form of xM
  return num_to_string(num / ONE_MILLION) + 'M'

def abbrev_num_to_usd(num):
  """
    abbrev_num: returns abbreviated version of number
    : param num: the number to convert
    : return --> correctly formatted usd string
  """
  if num < HUNDRED_THOUSAND:
    return abbrev_num(num)
  else:
    return '$' + abbrev_num(num)