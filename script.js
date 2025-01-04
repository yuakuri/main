let submitted = false; // 変数の場合

// 簡易的なNGワードの設定
var NGComments = ["死ね", "バカ", ".exe"];
var regex = new RegExp(NGComments.join("|"));

function test(wcheck) {
    if (wcheck.match(regex) != null) {
        alert("ERROR: コメントにNGワードが含まれています");
        return false;
    }

    // ボタンを無効化
    document.getElementById("submitbutton").disabled = true;

    // テキストエリア内の特殊文字をエスケープ
    let textareas = document.getElementsByTagName('textarea');
    for (let i = 0; i < textareas.length; i++) {
        textareas[i].value = textareas[i].value.replace(/</g, '&lt;');
    }

    // 入力欄内の特殊文字をエスケープ
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = inputs[i].value.replace(/</g, '&lt;');
    }

    return submitted = true;
}

// Googleスプレッドシートからコメントを取得して表示
d3.csv("https://docs.google.com/spreadsheets/d/1OQCCh3n6TkrT5MeJtmDsHRx6d2Yoc-LeMUnIxbc97Jo/export?format=csv&range=A3:D", function (error, data) {
    if (error) {
        console.error("CSV読み込み中にエラーが発生しました:", error);
        return;
    }

    let text = "";
    for (let i = 0; i < data.length; i++) {
        text += `${i + 1} 名前: <a href="mailto:${data[i].Mail}">${data[i].Name}</a> ${data[i].Timestamp}<pre>${data[i].Comments}</pre>`;
    }

    d3.select("#comments").html(text);
});
