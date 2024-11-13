export const IncomeTax = (req, res) => {
  const {
    annualIncome,
    businessIncome,
    otherIncome,
    businessExpenses,
    rateOfficeDeductions,
    healthInsurancePremium,
    retairmentContributions,
    otherDeductions,
    fillingStatus,
    stateOfResidence,
    dependents,
    taxCredit,
  } = req.body;
  // Validate required fields
  if (annualIncome === undefined || businessIncome === undefined) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  // formular to calculate taxable income (replace with actual formula)
  const taxableIncome = annualIncome - businessIncome - otherIncome;
  // calculate tax amount (replace with actual formula)
  const taxAmount = taxableIncome * 0.25 - taxCredit;
  // calculate net tax amount (replace with actual formula)
  const netTaxAmount =
    taxAmount -
    businessExpenses -
    rateOfficeDeductions -
    healthInsurancePremium -
    retairmentContributions -
    otherDeductions;
  res.json({
    netTaxAmount,
  });
};
