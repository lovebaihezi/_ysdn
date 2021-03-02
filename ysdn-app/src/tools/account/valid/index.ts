import { Check } from '../../permission';
import * as rules from '../../permission/rules';
import * as tips from '../tips';
export default function accountIsValid({
    account,
    password,
}: {
    account: string;
    password: string;
}): { account: string; password: string } {
    const final = {
        account: tips.accountNotValid,
        password: tips.passwordNotValid,
    };
    if (Check(account, rules.phoneRules)) {
        final.account = tips.accountValid;
    }
    if (Check(password, { rule: rules.passwordRule })) {
        final.password = tips.passwordValid;
    }
    return final;
}
