interface ConditionOfferStrategy {
  matchRequirements(): boolean;
  calculate(): number;
}

export default ConditionOfferStrategy;
