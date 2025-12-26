## 最終レポート用アイディアまとめ
###　システム化する対象候補(何にするかは決めてない)
戦闘機・戦闘艦・ビル
### ページ遷移(前のページに戻れるようになっている)
```mermaid
stateDiagram-v2

[*] --> /tank
/tank --> /tank_add
/tank --> /tank_detail

[*] --> /buttleship
/buttleship --> /buttleship_add
/buttleship --> /buttleship_detail

[*] --> /fighter
/fighter --> /fighter_add
/fighter --> /fighter_detail
```

### スキーマ(表内に表示するパラメータ)
#### 戦車(/tank版)
1. 名称
2. 開発国
3. 配備開始年

### レポートに必要な内容
最終レポートで必要な情報・仕様
ページ遷移をフローチャート化した図が必要になってくる(リンクがどうなっているか確認するため)，講義資料5に記載
RESTAPIを用いてデータの一覧や詳細・追加・削除・変更機能を実装する
JSファイルの先頭にuse strictをつける
仕様書はtexファイルで作成し，利用者向け(素人でもわかる程度の物で，使い方を書く)，管理者向け(ここを変更すればこうなるよと示せるもの)，開発者向け(改造したい人にどのような仕組みになっているか説明したもの)の3部構成にする
ソースコードをGithub内に入れ，レポート内にURLを示す
授業で説明していない技術を使った場合は，概要と採用理由を示す
利用者向けの仕様書…1番気に入っているシステムの使い方の1枚で良い
管理者向けの仕様書…システムの使い方を示した1枚で良い
開発者向けの仕様書…3つのシステム全ての物が必要

### トークンパスワード
Webpro_practice_2025_RexITKA
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

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

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
