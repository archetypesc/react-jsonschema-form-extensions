const type2String = {
  string: '字串',
  array: '陣列',
  date: '日期',
  'date-time': '日期',
  integer: '數字',
  boolean: '布林',
};

export default function transformErrors(errors) {
  return errors.map(e => {
    const keyword = e.name;
    let out = null;
    let n, cond;
    switch (keyword) {
      case '$ref':
        out = `無法找到引用${e.params.ref}`;
        break;
      case 'additionalItems':
        n = e.params.limit;
        out = `不可以超過${n}個元素`;
        break;
      case 'additionalProperties':
        out = '不可以有額外的屬性';
        break;
      case 'anyOf':
        out = '不符合 anyOf 指定的模式';
        break;
      case 'const':
        out = '應該等於常數';
        break;
      case 'contains':
        out = '應該包含一個有效元素';
        break;
      case 'custom':
        out = `應該通過 "${e.keyword} 關鍵詞檢驗"`;
        break;
      case 'dependencies':
        n = e.params.depsCount;
        out = `應該要有屬性${e.params.property}的依賴屬性${e.params.deps}`;
        break;
      case 'enum':
        out = '應該要在預設的值之中';
        break;
      case 'exclusiveMaximum':
        cond = `${e.params.comparison} ${e.params.limit}`;
        out = `應該要 ${cond}`;
        break;
      case 'exclusiveMinimum':
        cond = `${e.params.comparison} ${e.params.limit}`;
        out = `應該要 ${cond}`;
        break;
      case 'false schema':
        out = '布林模式不正確';
        break;
      case 'format':
        out = `應該要符合${e.params.format}格式`;
        break;
      case 'formatExclusiveMaximum':
        out = 'formatExclusiveMaximum 應該是布林值';
        break;
      case 'formatExclusiveMinimum':
        out = 'formatExclusiveMinimum 應該是布林值';
        break;
      case 'formatMaximum':
        cond = `${e.params.comparison} ${e.params.limit}`;
        out = `應該是 ${cond}`;
        break;
      case 'formatMinimum':
        cond = `${e.params.comparison} ${e.params.limit}`;
        out = `應該是 ${cond}`;
        break;
      case 'if':
        out = `應該符合 "${e.params.failingKeyword}" schema`;
        break;
      case 'maximum':
        cond = `${e.params.comparison} ${e.params.limit}`;
        out = `應該要 ${cond}`;
        break;
      case 'maxItems':
        n = e.params.limit;
        out = `不應該多於 ${n} 個`;
        break;
      case 'maxLength':
        n = e.params.limit;
        out = `不應該多於 ${n} 個字元`;
        break;
      case 'maxProperties':
        n = e.params.limit;
        out = `不應該多於 ${n} 個屬性`;
        break;
      case 'minimum':
        cond = `${e.params.comparison} ${e.params.limit}`;
        out = `應該要 ${cond}`;
        break;
      case 'minItems':
        n = e.params.limit;
        out = `不應該少於 ${n} 個`;
        break;
      case 'minLength':
        n = e.params.limit;
        out = `不應該少於 ${n} 個字元`;
        break;
      case 'minProperties':
        n = e.params.limit;
        out = `不應該少於 ${n} 個屬性`;
        break;
      case 'multipleOf':
        out = `應該是 ${e.params.multipleOf} 的整數倍`;
        break;
      case 'not':
        out = '不應該符合 "not" schema';
        break;
      case 'oneOf':
        out = '只能符合一個 "oneOf" 中的 schema';
        break;
      case 'pattern':
        out = `應該符合模式 "${e.params.pattern}"`;
        break;
      case 'patternRequired':
        out = `應該有屬性對應模式 ${e.params.missingPattern}`;
        break;
      case 'propertyNames':
        out = `属性名 '${e.params.propertyName}' 無效`;
        break;
      case 'required':
        out = '必填欄位';
        break;
      case 'switch':
        out = `因為 ${e.params.caseIndex} 失败，沒有通過 "switch" 檢驗, `;
        break;
      case 'type':
        out = `應該是 "${type2String[e.params.type]}" 類型`;
        break;
      case 'uniqueItems':
        out = `不應該有重複項目 (第 ${e.params.j} 項和第 ${e.params.i} 項是重複的)`;
        break;
      default:
    }

    if (out) e.message = out;

    return e;
  });
}
