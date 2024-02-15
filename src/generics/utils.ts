import { AccountEntity } from 'src/resources/account/entities/account.entity';

export class Utils {
  IsAuthorised(userAccount: AccountEntity, codeFunction: string): boolean {
    let auth = false;
    const privileges = userAccount.role.privileges;
    privileges.forEach((privilege) => {
      if (privilege.code == codeFunction) {
        auth = true;
      }
    });

    return auth;
  }
}
