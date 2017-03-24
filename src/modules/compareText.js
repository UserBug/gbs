import * as Diff from 'diff';

function getPrefix(diff) {
  return diff.added ? '+' : diff.removed ? '-' : ' ';
}

function compareText(firstText, secondText) {
  const rows = [];
  if (firstText.length || secondText.length) {
    const compareResult = Diff.diffLines(firstText || '', secondText || '');
    if (compareResult) {
      for (let i = 0; i < compareResult.length; i++) {
        const diff = compareResult[i];
        const nextDiff = compareResult[i + 1];
        if (nextDiff && (diff.added || diff.removed) && (nextDiff.added || nextDiff.removed)) {
          const lines = diff.value.split('\n').map(v => v.trim());
          const nextLines = nextDiff.value.split('\n');
          const rowsCount = lines.length > nextLines.length ? lines.length : nextLines.length;
          for (let l = 0; l < rowsCount;  l++) {
            if (lines[l] && nextLines[l]) {
              if (lines[l] === nextLines[l]) {
                rows.push({prefix: ' ', value: lines[l]});
              } else {
                rows.push({prefix: '*', value: lines[l] + '|' + nextLines[l]});
              }
            } else {
              if (lines[l]) {
                rows.push({prefix: getPrefix(diff), value: lines[l]});
              } else if (nextLines[l]) {
                rows.push({prefix: getPrefix(nextDiff), value: nextLines[l]});
              }
            }
          }
          i++;
        } else {
          const prefix = getPrefix(diff);
          diff.value.trim().split('\n').map(value => rows.push({prefix, value}));
        }
      }
    }
  }

  return rows;
}

export default compareText;
