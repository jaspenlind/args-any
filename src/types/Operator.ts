/**
 * Supported `Operators` used when filtering lists
 * @default `Eq`
 */
export enum Operator {
  /**
   * Equal to
   * @example
   * -option1 eq value1
   * -option2=5
   *  */
  Eq = 0,
  /**
   * Less than
   * @example
   * -option1<5
   * -option2 lt 2
   * */
  Lt,
  /**
   * Less than or equal to
   * @example
   * -option1 le 2
   * -option2<=2
   */
  Le,
  /**
   * Greater than
   * @example
   * -option1 gt 1
   * -option2>3
   */
  Gt,
  /**
   * Greater than or equal to
   * @example
   * -option1 ge 4
   * -option2>=5
   */
  Ge,
  /**
   * Not equal to
   * @example
   * -option1!=5
   * -option2 ne 4
   */
  Ne
}
