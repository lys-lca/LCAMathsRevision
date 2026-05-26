window.LCAMathsData = {
  "data/topics.json": [
    {
      "id": "number",
      "title": "Number skills",
      "shortTitle": "Number",
      "href": "number.html",
      "summary": "Order of operations, rounding, accuracy, fractions, decimals and percentages.",
      "module": "MCS.2",
      "accent": "teal"
    },
    {
      "id": "money",
      "title": "Money & percentages",
      "shortTitle": "Money",
      "href": "money.html",
      "summary": "Discounts, savings, tax, value for money, exchange rates and budgets.",
      "module": "Planning, Life Skills, Work",
      "accent": "yellow"
    },
    {
      "id": "measurement",
      "title": "Measurement & shape",
      "shortTitle": "Measurement",
      "href": "measurement.html",
      "summary": "Units, area, volume, circles, cylinders, scale diagrams and flooring packs.",
      "module": "MCS.3",
      "accent": "green"
    },
    {
      "id": "data",
      "title": "Data & statistics",
      "shortTitle": "Data",
      "href": "data.html",
      "summary": "Mean, median, mode, range, outliers and interpreting tables or charts.",
      "module": "MCS.5",
      "accent": "orange"
    },
    {
      "id": "relationships",
      "title": "Tables & graphs",
      "shortTitle": "Graphs",
      "href": "relationships.html",
      "summary": "Linear patterns, tables, graph reading, rates and working backwards.",
      "module": "MCS.4",
      "accent": "teal"
    },
    {
      "id": "time-work",
      "title": "Time, work & payslips",
      "shortTitle": "Work",
      "href": "time-work.html",
      "summary": "Time totals, weeks to months, invoices, hourly pay, deductions and net pay.",
      "module": "Mathematics and Work",
      "accent": "green"
    }
  ],
  "data/facts/number.json": {
    "id": "number",
    "title": "Number skills",
    "subtitle": "The core skills used in every LCA Mathematical Applications question.",
    "curriculumLinks": [
      "MCS.2: calculations with positive and negative numbers",
      "MCS.2: order of operations and brackets",
      "MCS.2: rounding and required accuracy",
      "MCS.2: convert between fractions, decimals and percentages"
    ],
    "examContexts": [
      "booking fees as percentages",
      "rounding money or measurements",
      "calculator checks",
      "fractions, decimals and percentages in offers"
    ],
    "rules": [
      {
        "title": "Use BIDMAS for mixed calculations",
        "explanation": "When a calculation has different operations, do brackets first, then powers or roots, then division and multiplication from left to right, then addition and subtraction from left to right.",
        "formula": "Brackets -> Indices -> Division/Multiplication -> Addition/Subtraction",
        "steps": [
          "Underline any brackets.",
          "Work out multiplication and division before adding or subtracting.",
          "Write one line of working after each step."
        ],
        "examples": [
          {
            "question": "Work out 6 + 4 x 3.",
            "working": "4 x 3 = 12, then 6 + 12 = 18.",
            "answer": "18"
          }
        ]
      },
      {
        "title": "Round only at the end",
        "explanation": "If a question asks for an answer to the nearest whole number, one decimal place, or two decimal places, keep the full calculator answer until the last line.",
        "formula": "Look one digit past the place you need",
        "steps": [
          "Find the place value the question asks for.",
          "Look at the next digit.",
          "If the next digit is 5 or more, round up. If it is 4 or less, keep it."
        ],
        "examples": [
          {
            "question": "Round 18.756 to two decimal places.",
            "working": "Two decimal places gives 18.75. The next digit is 6, so round up.",
            "answer": "18.76"
          }
        ]
      },
      {
        "title": "Percent means out of 100",
        "explanation": "A percentage is a part out of 100. This helps when moving between percentages, decimals and fractions.",
        "formula": "percentage / 100 = decimal",
        "steps": [
          "To change a percentage to a decimal, divide by 100.",
          "To change a decimal to a percentage, multiply by 100.",
          "Use common facts: 1/2 = 50%, 1/4 = 25%, 3/4 = 75%."
        ],
        "examples": [
          {
            "question": "Change 0.35 to a percentage.",
            "working": "0.35 x 100 = 35.",
            "answer": "35%"
          }
        ]
      },
      {
        "title": "Check if an answer is sensible",
        "explanation": "A fast estimate helps catch calculator mistakes. Round the numbers to easy values and compare your estimate with the exact answer.",
        "formula": "estimate first, exact answer second",
        "steps": [
          "Round the numbers to easy values.",
          "Do the mental calculation.",
          "If the calculator answer is far away, check the question again."
        ],
        "examples": [
          {
            "question": "Estimate 19.8 x 5.1.",
            "working": "19.8 is about 20 and 5.1 is about 5. 20 x 5 = 100.",
            "answer": "The exact answer should be close to 100."
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "order-ops",
        "title": "BIDMAS check",
        "level": "warm-up"
      },
      {
        "id": "rounding",
        "title": "Rounding sprint",
        "level": "core"
      },
      {
        "id": "percent-convert",
        "title": "Percent memory",
        "level": "core"
      },
      {
        "id": "negative-change",
        "title": "Temperature change",
        "level": "exam"
      }
    ]
  },
  "data/facts/money.json": {
    "id": "money",
    "title": "Money & percentages",
    "subtitle": "Practical money maths for offers, savings, tax, travel and budgets.",
    "curriculumLinks": [
      "Module 1: budgeting and value for money",
      "Module 3: personal finance",
      "Module 4: income, expenditure and wages",
      "MCS.2: percentages, ratio and proportion"
    ],
    "examContexts": [
      "sale discounts",
      "saving a fixed amount per week",
      "booking fees as a percentage",
      "currency exchange",
      "tax credits and deductions"
    ],
    "rules": [
      {
        "title": "Find a percentage of an amount",
        "explanation": "Change the percentage to a decimal, then multiply by the full amount.",
        "formula": "percentage amount = amount x percentage / 100",
        "steps": [
          "Write the percentage over 100.",
          "Multiply by the full amount.",
          "Add units such as EUR, kg or cm if needed."
        ],
        "examples": [
          {
            "question": "Find 20% of EUR 85.",
            "working": "85 x 20 / 100 = 17.",
            "answer": "EUR 17"
          }
        ]
      },
      {
        "title": "Discount means take away",
        "explanation": "A discount lowers the price. Find the discount amount first, then subtract it from the original price.",
        "formula": "sale price = original price - discount",
        "steps": [
          "Find the percentage discount.",
          "Subtract the discount from the original price.",
          "Check the sale price is smaller than the original price."
        ],
        "examples": [
          {
            "question": "A hoodie costs EUR 60 and has 25% off.",
            "working": "25% of 60 is 15. 60 - 15 = 45.",
            "answer": "EUR 45"
          }
        ]
      },
      {
        "title": "Weekly saving is division",
        "explanation": "If the same amount is saved each week, divide the target by the weekly saving. If there is a remainder, one extra week is needed.",
        "formula": "weeks = target / amount saved each week",
        "steps": [
          "Divide the full cost by the weekly saving.",
          "If the answer is not a whole number, round up to the next week.",
          "Check by multiplying weeks by weekly saving."
        ],
        "examples": [
          {
            "question": "A game costs EUR 92. You save EUR 10 each week.",
            "working": "92 / 10 = 9.2, so you need 10 weeks.",
            "answer": "10 weeks"
          }
        ]
      },
      {
        "title": "Exchange rates multiply or divide",
        "explanation": "Read the rate carefully. If EUR 1 equals dollars, multiply euro by the rate to change euro into dollars.",
        "formula": "dollars = euro x dollar rate",
        "steps": [
          "Write down what EUR 1 is worth.",
          "Multiply if changing euro into the other currency.",
          "Divide if changing the other currency back into euro."
        ],
        "examples": [
          {
            "question": "A flight costs EUR 300. EUR 1 = $1.08.",
            "working": "300 x 1.08 = 324.",
            "answer": "$324"
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "saving-weeks",
        "title": "Savings target",
        "level": "warm-up"
      },
      {
        "id": "discount-price",
        "title": "Sale price",
        "level": "core"
      },
      {
        "id": "booking-percent",
        "title": "Fee percentage",
        "level": "exam"
      },
      {
        "id": "exchange-rate",
        "title": "Currency trip",
        "level": "exam"
      }
    ]
  },
  "data/facts/measurement.json": {
    "id": "measurement",
    "title": "Measurement & shape",
    "subtitle": "Area, volume, units and scale questions from real-life contexts.",
    "curriculumLinks": [
      "MCS.2: convert between units",
      "MCS.3: area and perimeter of 2D shapes",
      "MCS.3: volume and surface area of 3D shapes",
      "MCS.3: scaled diagrams and models"
    ],
    "examContexts": [
      "box volume",
      "rainfall in a cylinder",
      "stage screen area",
      "flooring packs and wastage",
      "scale model lengths"
    ],
    "rules": [
      {
        "title": "Area measures flat space",
        "explanation": "Area is the amount of surface covered. A rectangle uses length times width. A circle uses pi times radius squared.",
        "formula": "rectangle area = length x width; circle area = pi x r x r",
        "steps": [
          "Check all measurements use the same unit.",
          "Choose the right formula.",
          "Write square units such as m2 or cm2."
        ],
        "examples": [
          {
            "question": "A bedroom floor is 6 m long and 4 m wide.",
            "working": "6 x 4 = 24.",
            "answer": "24 m2"
          }
        ]
      },
      {
        "title": "Volume measures space inside",
        "explanation": "Volume is used for boxes, tanks and containers. A rectangular solid uses length times width times height.",
        "formula": "cuboid volume = length x width x height",
        "steps": [
          "Check the shape.",
          "Multiply the three dimensions.",
          "Write cubic units such as cm3 or m3."
        ],
        "examples": [
          {
            "question": "A box is 10 cm by 5 cm by 4 cm.",
            "working": "10 x 5 x 4 = 200.",
            "answer": "200 cm3"
          }
        ]
      },
      {
        "title": "Cylinder volume uses the circular base",
        "explanation": "A cylinder is like a circle stretched upwards. Find the area of the circle, then multiply by height.",
        "formula": "cylinder volume = pi x r x r x h",
        "steps": [
          "Use the radius, not the diameter.",
          "Multiply pi by radius by radius by height.",
          "Divide by 1000 to change cm3 into litres."
        ],
        "examples": [
          {
            "question": "A cylinder has radius 5 cm and height 10 cm.",
            "working": "pi x 5 x 5 x 10 = 785.4 cm3.",
            "answer": "0.8 litres to 1 decimal place"
          }
        ]
      },
      {
        "title": "Scale connects model and real size",
        "explanation": "A scale such as 1:12 means 1 unit on the model represents 12 of the same units in real life.",
        "formula": "real length = model length x scale factor",
        "steps": [
          "Find the scale factor.",
          "Multiply model size by the scale factor for real size.",
          "Convert units if the answer needs metres or kilometres."
        ],
        "examples": [
          {
            "question": "A model car is 35 cm long at a scale of 1:12.",
            "working": "35 x 12 = 420 cm = 4.2 m.",
            "answer": "4.2 m"
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "cuboid-volume",
        "title": "Box volume",
        "level": "warm-up"
      },
      {
        "id": "cylinder-litres",
        "title": "Rainfall container",
        "level": "exam"
      },
      {
        "id": "circle-area",
        "title": "Circular screen",
        "level": "core"
      },
      {
        "id": "flooring-packs",
        "title": "Floor packs",
        "level": "exam"
      },
      {
        "id": "scale-model",
        "title": "Scale model",
        "level": "core"
      }
    ]
  },
  "data/facts/data.json": {
    "id": "data",
    "title": "Data & statistics",
    "subtitle": "Read tables, find averages, notice odd values and explain what the numbers mean.",
    "curriculumLinks": [
      "MCS.5: select and draw appropriate displays",
      "MCS.5: calculate mean, median, mode and range",
      "MCS.5: discuss misconceptions and misuse of statistics",
      "MCS.1: interpret and justify solutions"
    ],
    "examContexts": [
      "weather tables",
      "temperature mistakes",
      "survey data",
      "trend graphs",
      "choosing the best average"
    ],
    "rules": [
      {
        "title": "Mean is the balancing average",
        "explanation": "Add all the values and divide by how many values there are. The mean can be pulled up or down by one very unusual value.",
        "formula": "mean = total / number of values",
        "steps": [
          "Add the values.",
          "Count how many values there are.",
          "Divide the total by the count."
        ],
        "examples": [
          {
            "question": "Find the mean of 6, 7, 8 and 9.",
            "working": "6 + 7 + 8 + 9 = 30. 30 / 4 = 7.5.",
            "answer": "7.5"
          }
        ]
      },
      {
        "title": "Median is the middle value",
        "explanation": "Put the values in order. The median is the middle value. If there are two middle values, add them and divide by 2.",
        "formula": "ordered middle value",
        "steps": [
          "Write the values from smallest to biggest.",
          "Cross off one at each end until the middle is left.",
          "For two middle values, find their mean."
        ],
        "examples": [
          {
            "question": "Find the median of 7, 6, 9, 6, 8.",
            "working": "In order: 6, 6, 7, 8, 9. The middle is 7.",
            "answer": "7"
          }
        ]
      },
      {
        "title": "Range shows the spread",
        "explanation": "The range tells you how far apart the biggest and smallest values are.",
        "formula": "range = biggest value - smallest value",
        "steps": [
          "Find the highest value.",
          "Find the lowest value.",
          "Subtract the lowest from the highest."
        ],
        "examples": [
          {
            "question": "Find the range of 5, 12, 8 and 9.",
            "working": "12 - 5 = 7.",
            "answer": "7"
          }
        ]
      },
      {
        "title": "An outlier is unusual",
        "explanation": "An outlier is a value that does not fit the pattern. It may be a real result or it may be a recording mistake.",
        "formula": "look for the value far away from the rest",
        "steps": [
          "Look at the values in order.",
          "Find any value far away from the others.",
          "Explain why it might be unusual in the context."
        ],
        "examples": [
          {
            "question": "Temperatures are 6, 7, 6, 50, 8, 7.",
            "working": "50 is far away from the other temperatures.",
            "answer": "50 is likely to be a mistake or a different unit."
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "mean-weather",
        "title": "Mean weather",
        "level": "core"
      },
      {
        "id": "median-weather",
        "title": "Median check",
        "level": "warm-up"
      },
      {
        "id": "range-values",
        "title": "Range sprint",
        "level": "warm-up"
      },
      {
        "id": "outlier-value",
        "title": "Spot the outlier",
        "level": "exam"
      },
      {
        "id": "fahrenheit-celsius",
        "title": "Temperature conversion",
        "level": "exam"
      }
    ]
  },
  "data/facts/relationships.json": {
    "id": "relationships",
    "title": "Tables & graphs",
    "subtitle": "Use patterns, tables and graphs to describe everyday relationships.",
    "curriculumLinks": [
      "MCS.4: represent linear relationships in tables and graphs",
      "MCS.4: use words to describe general expressions",
      "MCS.4: use numeric, graphic and working-backwards strategies",
      "MCS.1: communicate findings mathematically"
    ],
    "examContexts": [
      "Re-turn deposit tables",
      "straight-line graphs",
      "estimating from a graph",
      "power generated by cyclists",
      "working backwards from a total"
    ],
    "rules": [
      {
        "title": "A table shows a pattern",
        "explanation": "In a linear table, the same increase in the first column gives the same increase in the second column.",
        "formula": "output = rate x input",
        "steps": [
          "Find what one item is worth.",
          "Multiply by the number of items.",
          "Use the same rule for each row."
        ],
        "examples": [
          {
            "question": "Small bottles are worth EUR 0.15 each. Find the amount for 20 bottles.",
            "working": "20 x 0.15 = 3.00.",
            "answer": "EUR 3.00"
          }
        ]
      },
      {
        "title": "A straight-line graph has a steady rate",
        "explanation": "If every extra item adds the same amount, the graph is a straight line. The slope tells you the rate.",
        "formula": "steady rate means straight line",
        "steps": [
          "Plot at least two correct points.",
          "Join with a straight line.",
          "Read across and down to estimate missing values."
        ],
        "examples": [
          {
            "question": "If 10 bottles gives EUR 1.50 and 20 gives EUR 3.00, the points line up.",
            "working": "Each bottle adds EUR 0.15.",
            "answer": "The graph is a straight line."
          }
        ]
      },
      {
        "title": "Working backwards undoes the steps",
        "explanation": "When you know the final total, subtract the part you already know, then divide by the rate for the unknown part.",
        "formula": "unknown count = remaining amount / rate",
        "steps": [
          "Find the value of the known items.",
          "Subtract it from the total.",
          "Divide by the value of one unknown item."
        ],
        "examples": [
          {
            "question": "A student gets EUR 5.00 total. EUR 2.25 is from small bottles. Large bottles are EUR 0.25 each.",
            "working": "5.00 - 2.25 = 2.75. 2.75 / 0.25 = 11.",
            "answer": "11 large bottles"
          }
        ]
      },
      {
        "title": "Rates multiply over time or people",
        "explanation": "If one person makes a certain amount per minute, multiply by minutes and by number of people.",
        "formula": "total = rate x time x number of people",
        "steps": [
          "Find the rate for one person for one minute.",
          "Multiply by the number of minutes.",
          "Multiply by the number of people."
        ],
        "examples": [
          {
            "question": "One person makes 12 watts each minute. How much for 5 people for 10 minutes?",
            "working": "12 x 10 x 5 = 600.",
            "answer": "600 watts"
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "deposit-return",
        "title": "Deposit amount",
        "level": "warm-up"
      },
      {
        "id": "deposit-backwards",
        "title": "Work backwards",
        "level": "exam"
      },
      {
        "id": "rate-power",
        "title": "Power rate",
        "level": "core"
      },
      {
        "id": "linear-table",
        "title": "Fill the table",
        "level": "core"
      }
    ]
  },
  "data/facts/time-work.json": {
    "id": "time-work",
    "title": "Time, work & payslips",
    "subtitle": "Timings, wages, invoices, deductions and workplace calculations.",
    "curriculumLinks": [
      "Module 2: travel, recreation and timings",
      "Module 4: income, expenditure, wages, holidays and contracts",
      "MCS.2: convert between units of time",
      "MCS.1: communicate findings in context"
    ],
    "examContexts": [
      "total build time in hours and minutes",
      "apprenticeship weeks and months",
      "flooring installation invoice",
      "gross tax, tax credit, deductions and net pay",
      "hourly pay"
    ],
    "rules": [
      {
        "title": "Convert minutes to hours and minutes",
        "explanation": "There are 60 minutes in 1 hour. Divide by 60 to find hours, and the remainder is the minutes left over.",
        "formula": "total minutes = 60 x hours + minutes",
        "steps": [
          "Add all minutes first.",
          "Divide by 60.",
          "The whole number is hours and the remainder is minutes."
        ],
        "examples": [
          {
            "question": "Change 175 minutes to hours and minutes.",
            "working": "175 / 60 = 2 remainder 55.",
            "answer": "2 hours 55 minutes"
          }
        ]
      },
      {
        "title": "Invoices are item totals added together",
        "explanation": "Multiply quantity by price for each line, then add all lines for the final total.",
        "formula": "invoice total = item 1 + item 2 + labour + charges",
        "steps": [
          "Find each line total.",
          "Add the line totals.",
          "Check the final answer is in EUR."
        ],
        "examples": [
          {
            "question": "Two rolls cost EUR 75 each and labour is 5 hours at EUR 50.",
            "working": "Underlay: 2 x 75 = 150. Labour: 5 x 50 = 250.",
            "answer": "EUR 400 before other items"
          }
        ]
      },
      {
        "title": "Net pay is what is left",
        "explanation": "Gross pay is before deductions. Net pay is gross pay minus tax, PRSI, USC and any other deductions.",
        "formula": "net pay = gross pay - total deductions",
        "steps": [
          "Find gross tax if needed.",
          "Subtract tax credits to get net tax.",
          "Add all deductions and subtract them from gross pay."
        ],
        "examples": [
          {
            "question": "Gross pay is EUR 420. Deductions are EUR 60.",
            "working": "420 - 60 = 360.",
            "answer": "Net pay is EUR 360"
          }
        ]
      },
      {
        "title": "Weeks and months are approximate",
        "explanation": "Some exam questions use 4.3 weeks in a month. Divide weeks by 4.3 to change weeks into months.",
        "formula": "months = weeks / 4.3",
        "steps": [
          "Add the weeks.",
          "Divide by 4.3.",
          "Round as asked in the question."
        ],
        "examples": [
          {
            "question": "Change 44 weeks into months using 4.3 weeks per month.",
            "working": "44 / 4.3 = 10.23.",
            "answer": "10 months to the nearest whole month"
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "time-total",
        "title": "Hours and minutes",
        "level": "warm-up"
      },
      {
        "id": "invoice-total",
        "title": "Invoice builder",
        "level": "core"
      },
      {
        "id": "payslip-net",
        "title": "Payslip check",
        "level": "exam"
      },
      {
        "id": "weeks-months",
        "title": "Apprenticeship time",
        "level": "exam"
      },
      {
        "id": "hourly-pay",
        "title": "Hourly pay",
        "level": "core"
      }
    ]
  },
  "data/exam-bank.json": {
    "title": "LCA Mathematical Applications practice bank",
    "sourceNotes": [
      "Question types are based on the LCA Mathematical Applications curriculum and the 2025 sample exam paper in this folder.",
      "Numbers are generated by the app so learners can repeat each type several times."
    ],
    "paperInstructions": [
      "Answer all questions.",
      "Show supporting work.",
      "Include units where needed.",
      "Calculators may be used."
    ],
    "types": [
      {
        "id": "saving-weeks",
        "topic": "money",
        "title": "Saving a fixed amount each week",
        "marks": 5,
        "generator": "saving-weeks",
        "mixes": [
          "balanced",
          "money"
        ],
        "examSkill": "Divide and round up in a money context"
      },
      {
        "id": "discount-price",
        "topic": "money",
        "title": "Sale discount",
        "marks": 8,
        "generator": "discount-price",
        "mixes": [
          "balanced",
          "money"
        ],
        "examSkill": "Find a percentage discount and sale price"
      },
      {
        "id": "cuboid-volume",
        "topic": "measurement",
        "title": "Volume of a rectangular box",
        "marks": 8,
        "generator": "cuboid-volume",
        "mixes": [
          "balanced",
          "measurement"
        ],
        "examSkill": "Multiply length, width and height"
      },
      {
        "id": "scale-model",
        "topic": "measurement",
        "title": "Scale model length",
        "marks": 8,
        "generator": "scale-model",
        "mixes": [
          "balanced",
          "measurement"
        ],
        "examSkill": "Use a scale factor and convert units"
      },
      {
        "id": "mean-weather",
        "topic": "data",
        "title": "Mean from a weather table",
        "marks": 7,
        "generator": "mean-weather",
        "mixes": [
          "balanced"
        ],
        "examSkill": "Add values and divide by the number of days"
      },
      {
        "id": "median-weather",
        "topic": "data",
        "title": "Median from a weather table",
        "marks": 6,
        "generator": "median-weather",
        "mixes": [
          "balanced"
        ],
        "examSkill": "Order values and select the middle"
      },
      {
        "id": "fahrenheit-celsius",
        "topic": "data",
        "title": "Convert Fahrenheit to Celsius",
        "marks": 7,
        "generator": "fahrenheit-celsius",
        "mixes": [
          "balanced"
        ],
        "examSkill": "Substitute into a formula"
      },
      {
        "id": "cylinder-litres",
        "topic": "measurement",
        "title": "Volume of a cylinder in litres",
        "marks": 10,
        "generator": "cylinder-litres",
        "mixes": [
          "balanced",
          "measurement"
        ],
        "examSkill": "Use pi r squared h and convert cm3 to litres"
      },
      {
        "id": "deposit-return",
        "topic": "relationships",
        "title": "Re-turn deposit table",
        "marks": 8,
        "generator": "deposit-return",
        "mixes": [
          "balanced",
          "money"
        ],
        "examSkill": "Use a steady rate in a table"
      },
      {
        "id": "deposit-backwards",
        "topic": "relationships",
        "title": "Work backwards from deposit total",
        "marks": 9,
        "generator": "deposit-backwards",
        "mixes": [
          "balanced",
          "money"
        ],
        "examSkill": "Subtract known amount then divide by rate"
      },
      {
        "id": "rate-power",
        "topic": "relationships",
        "title": "Rate over people and minutes",
        "marks": 8,
        "generator": "rate-power",
        "mixes": [
          "balanced"
        ],
        "examSkill": "Multiply rate by time and number of people"
      },
      {
        "id": "circle-area",
        "topic": "measurement",
        "title": "Area of a circular screen",
        "marks": 8,
        "generator": "circle-area",
        "mixes": [
          "balanced",
          "measurement"
        ],
        "examSkill": "Use diameter to find radius, then pi r squared"
      },
      {
        "id": "booking-percent",
        "topic": "money",
        "title": "Booking fee as a percentage",
        "marks": 7,
        "generator": "booking-percent",
        "mixes": [
          "balanced",
          "money"
        ],
        "examSkill": "Part divided by whole times 100"
      },
      {
        "id": "exchange-rate",
        "topic": "money",
        "title": "Currency exchange",
        "marks": 6,
        "generator": "exchange-rate",
        "mixes": [
          "balanced",
          "money"
        ],
        "examSkill": "Multiply by the exchange rate"
      },
      {
        "id": "flooring-packs",
        "topic": "measurement",
        "title": "Floor area, wastage and packs",
        "marks": 12,
        "generator": "flooring-packs",
        "mixes": [
          "balanced",
          "measurement",
          "work"
        ],
        "examSkill": "Find area, add wastage and round packs up"
      },
      {
        "id": "invoice-total",
        "topic": "time-work",
        "title": "Complete an invoice",
        "marks": 10,
        "generator": "invoice-total",
        "mixes": [
          "balanced",
          "work"
        ],
        "examSkill": "Calculate line totals and add"
      },
      {
        "id": "weeks-months",
        "topic": "time-work",
        "title": "Apprenticeship weeks and months",
        "marks": 8,
        "generator": "weeks-months",
        "mixes": [
          "balanced",
          "work"
        ],
        "examSkill": "Convert weeks to months using 4.3 weeks per month"
      },
      {
        "id": "payslip-net",
        "topic": "time-work",
        "title": "Payslip net pay",
        "marks": 12,
        "generator": "payslip-net",
        "mixes": [
          "balanced",
          "work"
        ],
        "examSkill": "Calculate tax, deductions and net pay"
      }
    ]
  }
};
