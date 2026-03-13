# Page snapshot

```yaml
- generic [ref=e4]:
  - link "Fork me on GitHub":
    - /url: https://github.com/tourdedave/the-internet
    - img "Fork me on GitHub" [ref=e5] [cursor=pointer]
  - generic [ref=e6]:
    - generic [ref=e7]:
      - heading "Dynamic Controls" [level=4] [ref=e8]
      - paragraph [ref=e9]: This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.
      - heading "Remove/add" [level=4] [ref=e10]
      - generic [ref=e11]:
        - button "Add" [ref=e12] [cursor=pointer]
        - paragraph [ref=e13]: It's gone!
      - separator [ref=e14]
      - heading "Enable/disable" [level=4] [ref=e15]
      - generic [ref=e16]:
        - textbox [disabled] [ref=e17]
        - button "Enable" [ref=e18] [cursor=pointer]
    - generic [ref=e20]:
      - separator [ref=e21]
      - generic [ref=e22]:
        - text: Powered by
        - link "Elemental Selenium" [ref=e23] [cursor=pointer]:
          - /url: http://elementalselenium.com/
```