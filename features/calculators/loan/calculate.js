// Present value of an ordinary annuity: what `payment` per period, for
// `periods` periods at `rate` per period, is worth today. Used both to
// derive the reducing-balance installment and, run in reverse via
// bisection, to find the effective rate a flat-rate installment implies.
function presentValueOfAnnuity(payment, rate, periods) {
  if (rate === 0) return payment * periods;
  return (payment * (1 - Math.pow(1 + rate, -periods))) / rate;
}

// Standard bank-loan amortization: interest accrues only on the
// outstanding balance, so the installment is smaller than flat rate would
// suggest for the same stated rate.
export function calculateReducingBalance(
  principal,
  annualRatePercent,
  months
) {
  const monthlyRate = annualRatePercent / 100 / 12;
  const monthlyInstallment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = monthlyInstallment * months;
  const totalInterest = totalPayment - principal;

  return { monthlyInstallment, totalPayment, totalInterest };
}

// Solves for the monthly compound rate `r` at which a reducing-balance loan
// of `principal` paid off by `monthlyInstallment` over `months` would have
// its stated rate - i.e. the true cost of a flat-rate installment,
// expressed as an effective annual rate. Bisection because there's no
// closed form for r here (it's an IRR problem).
function effectiveAnnualRateFromInstallment(principal, monthlyInstallment, months) {
  let low = 0;
  let high = 10; // 1000%/month ceiling - far beyond any realistic loan
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const presentValue = presentValueOfAnnuity(monthlyInstallment, mid, months);
    if (presentValue > principal) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const monthlyRate = (low + high) / 2;
  return (Math.pow(1 + monthlyRate, 12) - 1) * 100;
}

// Flat-rate ("installment plan") method: interest is calculated once on
// the full original principal for the whole term and split evenly across
// installments, so - unlike reducing balance - it doesn't shrink as the
// balance is paid down. This makes its stated rate understate the true
// cost, which is what effectiveAnnualRatePercent surfaces.
export function calculateFlatRate(principal, annualRatePercent, months) {
  const totalInterest = principal * (annualRatePercent / 100) * (months / 12);
  const totalPayment = principal + totalInterest;
  const monthlyInstallment = totalPayment / months;

  const effectiveAnnualRatePercent = effectiveAnnualRateFromInstallment(
    principal,
    monthlyInstallment,
    months
  );

  return {
    monthlyInstallment,
    totalPayment,
    totalInterest,
    effectiveAnnualRatePercent,
  };
}
