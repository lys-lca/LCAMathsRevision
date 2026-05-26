(function () {
  "use strict";

  const EURO = "\u20ac";

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function choice(items) {
    return items[randInt(0, items.length - 1)];
  }

  function multiple(min, max, step) {
    const count = Math.floor((max - min) / step);
    return min + randInt(0, count) * step;
  }

  function round(value, places = 0) {
    const factor = 10 ** places;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function formatNumber(value, places = 0) {
    return Number(value).toLocaleString("en-IE", {
      minimumFractionDigits: places,
      maximumFractionDigits: places
    });
  }

  function formatMoney(value) {
    return `${EURO}${formatNumber(value, 2)}`;
  }

  function hm(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  }

  function parseUserNumber(input) {
    if (input === null || input === undefined) return NaN;
    const cleaned = String(input)
      .replace(/[,\s]/g, "")
      .replace(/[€$%]/g, "")
      .replace(/eur/gi, "")
      .replace(/minutes?/gi, "")
      .replace(/hours?/gi, "");
    const match = cleaned.match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  }

  function isCorrect(input, question) {
    const value = parseUserNumber(input);
    if (!Number.isFinite(value)) return false;
    const tolerance = question.tolerance ?? 0.001;
    return Math.abs(value - question.answer) <= tolerance;
  }

  function q(id, title, question, answer, answerText, explanation, tolerance = 0.001) {
    return { id, title, question, answer, answerText, explanation, tolerance };
  }

  const generators = {
    "order-ops": () => {
      const mode = choice(["addMultiply", "brackets", "subtractMultiply"]);
      const a = randInt(4, 18);
      const b = randInt(2, 9);
      const c = randInt(3, 12);
      if (mode === "brackets") {
        const answer = (a + b) * c;
        return q("order-ops", "BIDMAS check", `Work out (${a} + ${b}) x ${c}.`, answer, String(answer), `Brackets first: ${a} + ${b} = ${a + b}. Then ${a + b} x ${c} = ${answer}.`);
      }
      if (mode === "subtractMultiply") {
        const answer = a * c - b;
        return q("order-ops", "BIDMAS check", `Work out ${a} x ${c} - ${b}.`, answer, String(answer), `Multiply first: ${a} x ${c} = ${a * c}. Then subtract ${b} to get ${answer}.`);
      }
      const answer = a + b * c;
      return q("order-ops", "BIDMAS check", `Work out ${a} + ${b} x ${c}.`, answer, String(answer), `Multiply first: ${b} x ${c} = ${b * c}. Then ${a} + ${b * c} = ${answer}.`);
    },

    rounding: () => {
      const value = randInt(12000, 98765) / 1000;
      const places = choice([0, 1, 2]);
      const label = places === 0 ? "nearest whole number" : `${places} decimal place${places === 1 ? "" : "s"}`;
      const answer = round(value, places);
      return q("rounding", "Rounding sprint", `Round ${value.toFixed(3)} to the ${label}.`, answer, formatNumber(answer, places), `Keep the full number until the last step. Rounded to ${label}: ${formatNumber(answer, places)}.`, places === 0 ? 0.001 : 0.01);
    },

    "percent-convert": () => {
      const decimal = choice([0.05, 0.1, 0.125, 0.2, 0.25, 0.4, 0.5, 0.75, 0.8]);
      const answer = decimal * 100;
      return q("percent-convert", "Percent memory", `Change ${decimal} to a percentage.`, answer, `${formatNumber(answer, answer % 1 === 0 ? 0 : 1)}%`, `${decimal} x 100 = ${answer}.`);
    },

    "negative-change": () => {
      const start = randInt(-8, 5);
      const change = choice([-9, -6, -4, 4, 6, 9, 12]);
      const direction = change >= 0 ? "rises" : "falls";
      const answer = start + change;
      return q("negative-change", "Temperature change", `The temperature is ${start} degrees Celsius. It ${direction} by ${Math.abs(change)} degrees. What is the new temperature?`, answer, `${answer} degrees Celsius`, `${start} ${change >= 0 ? "+" : "-"} ${Math.abs(change)} = ${answer}.`);
    },

    "saving-weeks": () => {
      const weekly = choice([5, 8, 10, 12, 15, 20]);
      const target = multiple(45, 240, 5);
      const answer = Math.ceil(target / weekly);
      return q("saving-weeks", "Savings target", `A learner wants to buy something costing ${formatMoney(target)}. They save ${formatMoney(weekly)} each week. How many weeks are needed?`, answer, `${answer} weeks`, `${target} / ${weekly} = ${formatNumber(target / weekly, 2)}. Round up because a part week still needs another week.`);
    },

    "discount-price": () => {
      const price = multiple(40, 240, 5);
      const percent = choice([10, 15, 20, 25, 30, 40]);
      const discount = round(price * percent / 100, 2);
      const answer = round(price - discount, 2);
      return q("discount-price", "Sale price", `An item costs ${formatMoney(price)} and has ${percent}% off. What is the sale price?`, answer, formatMoney(answer), `${percent}% of ${formatMoney(price)} is ${formatMoney(discount)}. ${formatMoney(price)} - ${formatMoney(discount)} = ${formatMoney(answer)}.`, 0.01);
    },

    "booking-percent": () => {
      const total = multiple(80, 220, 10);
      const fee = choice([5, 10, 12, 15, 18, 20, 25]);
      const answer = round(fee / total * 100, 1);
      return q("booking-percent", "Fee percentage", `A ticket costs ${formatMoney(total)}, including a booking fee of ${formatMoney(fee)}. Write the booking fee as a percentage of the total cost, correct to 1 decimal place.`, answer, `${formatNumber(answer, 1)}%`, `${fee} / ${total} x 100 = ${formatNumber(answer, 1)}%.`, 0.1);
    },

    "exchange-rate": () => {
      const euro = choice([120, 180, 240, 300, 420, 570, 650]);
      const rate = choice([1.04, 1.06, 1.08, 1.12]);
      const answer = round(euro * rate, 2);
      return q("exchange-rate", "Currency trip", `A flight costs ${formatMoney(euro)}. The exchange rate is EUR 1 = $${rate.toFixed(2)}. What is the cost in US dollars?`, answer, `$${formatNumber(answer, 2)}`, `${euro} x ${rate.toFixed(2)} = ${formatNumber(answer, 2)}.`, 0.01);
    },

    "cuboid-volume": () => {
      const length = randInt(18, 55);
      const width = randInt(4, 14);
      const height = randInt(8, 32);
      const answer = length * width * height;
      return q("cuboid-volume", "Box volume", `A rectangular box has length ${length} cm, width ${width} cm and height ${height} cm. Work out its volume in cm3.`, answer, `${formatNumber(answer)} cm3`, `${length} x ${width} x ${height} = ${answer}.`);
    },

    "cylinder-litres": () => {
      const radius = randInt(4, 10);
      const height = randInt(5, 18);
      const cm3 = Math.PI * radius * radius * height;
      const answer = round(cm3 / 1000, 1);
      return q("cylinder-litres", "Rainfall container", `A cylindrical container has radius ${radius} cm and water height ${height} cm. Work out the volume in litres, correct to 1 decimal place.`, answer, `${formatNumber(answer, 1)} litres`, `Volume = pi x ${radius} x ${radius} x ${height} = ${formatNumber(cm3, 1)} cm3. Divide by 1000 to get ${formatNumber(answer, 1)} litres.`, 0.1);
    },

    "circle-area": () => {
      const diameter = randInt(60, 160) / 10;
      const radius = diameter / 2;
      const answer = round(Math.PI * radius * radius, 2);
      return q("circle-area", "Circular screen", `A circular screen has diameter ${diameter.toFixed(1)} m. Work out its area in m2, correct to 2 decimal places.`, answer, `${formatNumber(answer, 2)} m2`, `Radius = ${diameter.toFixed(1)} / 2 = ${formatNumber(radius, 2)} m. Area = pi x r x r = ${formatNumber(answer, 2)} m2.`, 0.01);
    },

    "flooring-packs": () => {
      const length = randInt(3, 8);
      const width = randInt(2, 6);
      const wastage = choice([10, 12, 15]);
      const cover = choice([1.8, 2, 2.2, 2.5]);
      const area = length * width;
      const needed = area * (1 + wastage / 100);
      const answer = Math.ceil(needed / cover);
      return q("flooring-packs", "Floor packs", `A rectangular floor is ${length} m by ${width} m. Add ${wastage}% for wastage. Each pack covers ${cover.toFixed(1)} m2. What is the least number of packs needed?`, answer, `${answer} packs`, `Area = ${area} m2. With wastage: ${formatNumber(needed, 2)} m2. ${formatNumber(needed, 2)} / ${cover.toFixed(1)} = ${formatNumber(needed / cover, 2)}, so round up to ${answer} packs.`);
    },

    "scale-model": () => {
      const model = randInt(24, 48);
      const factor = choice([8, 10, 12, 15, 20]);
      const metres = model * factor / 100;
      const answer = Math.round(metres);
      return q("scale-model", "Scale model", `A model is ${model} cm long. The scale is 1:${factor}. Work out the real length to the nearest metre.`, answer, `${answer} m`, `${model} x ${factor} = ${model * factor} cm = ${formatNumber(metres, 2)} m. Nearest metre: ${answer} m.`);
    },

    "mean-weather": () => {
      const count = choice([5, 7]);
      const values = Array.from({ length: count }, () => randInt(5, 16));
      const total = values.reduce((sum, value) => sum + value, 0);
      const answer = round(total / count, 1);
      return q("mean-weather", "Mean weather", `The temperatures are ${values.join(", ")} degrees Celsius. Find the mean temperature, correct to 1 decimal place.`, answer, `${formatNumber(answer, 1)} degrees Celsius`, `Total = ${total}. ${total} / ${count} = ${formatNumber(answer, 1)}.`, 0.1);
    },

    "median-weather": () => {
      const values = Array.from({ length: 7 }, () => randInt(4, 17));
      const sorted = [...values].sort((a, b) => a - b);
      const answer = sorted[3];
      return q("median-weather", "Median check", `The temperatures are ${values.join(", ")} degrees Celsius. Find the median temperature.`, answer, `${answer} degrees Celsius`, `In order: ${sorted.join(", ")}. The middle value is ${answer}.`);
    },

    "range-values": () => {
      const values = Array.from({ length: 6 }, () => randInt(3, 28));
      const answer = Math.max(...values) - Math.min(...values);
      return q("range-values", "Range sprint", `Find the range of these values: ${values.join(", ")}.`, answer, String(answer), `Highest value ${Math.max(...values)} minus lowest value ${Math.min(...values)} = ${answer}.`);
    },

    "outlier-value": () => {
      const normal = Array.from({ length: 6 }, () => randInt(5, 12));
      const outlier = randInt(35, 62);
      const values = [...normal, outlier].sort(() => Math.random() - 0.5);
      return q("outlier-value", "Spot the outlier", `One value looks unusual: ${values.join(", ")}. Which value is the outlier?`, outlier, String(outlier), `${outlier} is far away from the other values, so it is the outlier.`);
    },

    "fahrenheit-celsius": () => {
      const fahrenheit = choice([41, 50, 59, 68, 77, 86]);
      const answer = round(5 / 9 * (fahrenheit - 32), 1);
      return q("fahrenheit-celsius", "Temperature conversion", `Convert ${fahrenheit} degrees Fahrenheit to Celsius using C = 5/9 x (F - 32).`, answer, `${formatNumber(answer, 1)} degrees Celsius`, `C = 5/9 x (${fahrenheit} - 32) = ${formatNumber(answer, 1)}.`, 0.1);
    },

    "deposit-return": () => {
      const count = multiple(5, 45, 5);
      const rate = 0.15;
      const answer = round(count * rate, 2);
      return q("deposit-return", "Deposit amount", `Small drink containers are worth ${formatMoney(rate)} each. How much is claimed back for ${count} small containers?`, answer, formatMoney(answer), `${count} x ${formatMoney(rate)} = ${formatMoney(answer)}.`, 0.01);
    },

    "deposit-backwards": () => {
      const smallCount = multiple(5, 30, 5);
      const largeCount = randInt(4, 18);
      const total = round(smallCount * 0.15 + largeCount * 0.25, 2);
      return q("deposit-backwards", "Work backwards", `A learner returned ${smallCount} small containers and some large containers. The total refund was ${formatMoney(total)}. Large containers are worth ${formatMoney(0.25)} each. How many large containers were returned?`, largeCount, `${largeCount} large containers`, `Small containers: ${smallCount} x ${formatMoney(0.15)} = ${formatMoney(smallCount * 0.15)}. Remaining: ${formatMoney(total - smallCount * 0.15)}. Divide by ${formatMoney(0.25)} to get ${largeCount}.`);
    },

    "rate-power": () => {
      const rate = choice([10, 12, 15]);
      const minutes = choice([5, 8, 10, 12, 15]);
      const people = choice([4, 8, 10, 12, 20]);
      const answer = rate * minutes * people;
      return q("rate-power", "Power rate", `One person cycling for 1 minute generates ${rate} watts. How many watts are generated by ${people} people cycling for ${minutes} minutes?`, answer, `${formatNumber(answer)} watts`, `${rate} x ${minutes} x ${people} = ${answer}.`);
    },

    "linear-table": () => {
      const rate = choice([0.15, 0.25, 0.5, 2, 3]);
      const count = multiple(6, 36, 3);
      const answer = round(rate * count, 2);
      return q("linear-table", "Fill the table", `A table follows the rule amount = ${formatMoney(rate)} x number of items. What amount goes with ${count} items?`, answer, formatMoney(answer), `${formatMoney(rate)} x ${count} = ${formatMoney(answer)}.`, 0.01);
    },

    "time-total": () => {
      const times = Array.from({ length: 5 }, () => multiple(25, 80, 5));
      const total = times.reduce((sum, value) => sum + value, 0);
      return q("time-total", "Hours and minutes", `Five tasks take ${times.join(", ")} minutes. What is the total time in minutes?`, total, `${total} minutes (${hm(total)})`, `Add the times: ${times.join(" + ")} = ${total} minutes, which is ${hm(total)}.`);
    },

    "invoice-total": () => {
      const material = multiple(180, 520, 5);
      const rolls = randInt(1, 4);
      const rollCost = choice([45, 60, 75, 90]);
      const hours = randInt(3, 8);
      const hourly = choice([35, 40, 45, 50, 55]);
      const answer = material + rolls * rollCost + hours * hourly;
      return q("invoice-total", "Invoice builder", `Complete the invoice total: materials ${formatMoney(material)}, underlay ${rolls} rolls at ${formatMoney(rollCost)} each, labour ${hours} hours at ${formatMoney(hourly)} per hour.`, answer, formatMoney(answer), `Underlay = ${formatMoney(rolls * rollCost)}. Labour = ${formatMoney(hours * hourly)}. Total = ${formatMoney(answer)}.`, 0.01);
    },

    "payslip-net": () => {
      const gross = multiple(320, 620, 5);
      const credit = choice([55.25, 62.4, 71.43, 80]);
      const prsi = round(gross * choice([0.03, 0.035, 0.04]), 2);
      const usc = round(gross * choice([0.01, 0.015, 0.02]), 2);
      const grossTax = round(gross * 0.2, 2);
      const netTax = Math.max(0, round(grossTax - credit, 2));
      const totalDeductions = round(netTax + prsi + usc, 2);
      const answer = round(gross - totalDeductions, 2);
      return q("payslip-net", "Payslip check", `Gross pay is ${formatMoney(gross)}. Income tax is 20%, tax credit is ${formatMoney(credit)}, PRSI is ${formatMoney(prsi)}, and USC is ${formatMoney(usc)}. What is the net pay?`, answer, formatMoney(answer), `Gross tax = ${formatMoney(grossTax)}. Net tax = ${formatMoney(netTax)}. Total deductions = ${formatMoney(totalDeductions)}. Net pay = ${formatMoney(answer)}.`, 0.01);
    },

    "weeks-months": () => {
      const weeks = choice([11, 22, 33, 44, 55, 66]);
      const answer = Math.round(weeks / 4.3);
      return q("weeks-months", "Apprenticeship time", `Use 4.3 weeks in a month. Convert ${weeks} weeks into months, correct to the nearest whole month.`, answer, `${answer} months`, `${weeks} / 4.3 = ${formatNumber(weeks / 4.3, 2)}, which rounds to ${answer} months.`);
    },

    "hourly-pay": () => {
      const rate = choice([11.5, 12.7, 14, 15.5, 18]);
      const hours = choice([8, 12, 16, 20, 24, 30]);
      const answer = round(rate * hours, 2);
      return q("hourly-pay", "Hourly pay", `A worker earns ${formatMoney(rate)} per hour and works ${hours} hours. What is the gross pay?`, answer, formatMoney(answer), `${formatMoney(rate)} x ${hours} = ${formatMoney(answer)}.`, 0.01);
    }
  };

  function getQuestion(id) {
    const generator = generators[id];
    if (!generator) {
      return q("missing", "Practice question", `No generator has been built for "${id}" yet.`, 0, "0", "Add a matching generator in js/question-generators.js.");
    }
    return generator();
  }

  window.LCAMaths = {
    EURO,
    generators,
    getQuestion,
    isCorrect,
    parseUserNumber,
    formatMoney,
    formatNumber,
    round,
    choice
  };
})();
