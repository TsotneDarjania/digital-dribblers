import { Footballer } from "../characters/footballer";

export interface PassOptions {
  goalKeeper: {
    footballersForshortPass: Array<Footballer>;
    footballersForLongPass: Array<Footballer>;
  };
  defender: {
    footballersForshortPass: Array<Footballer>;
    footballersForLongPass: Array<Footballer>;
  };
  midfielder: {
    footballersForshortPass: Array<Footballer>;
    footballersForLongPass: Array<Footballer>;
  };
}
