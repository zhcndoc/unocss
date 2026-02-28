# @unocss/reset/tailwind-compat.css

基于 [tailwind.css](./tailwind.css)，对部分样式进行了清理，以避免与 UI 框架冲突。

## 变更

### [继承自 `tailwind.css` 的变更](./tailwind.md)

### 移除按钮的背景色覆盖

相关 issue：[#2127](https://github.com/unocss/unocss/issues/2127)

<table>
<thead>
<tr style="text-align: center">
<th>变更前</th>
<th>变更后</th>
</tr>
</thead>
<tbody>
<tr>
<td>

```css
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
```

</td>

<td>

```css
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  /*background-color: transparent; !* 2 *!*/
  background-image: none; /* 2 */
}
```

</td>
</tr>
</tbody>
</table>
