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
      - button "Add" [ref=e12] [cursor=pointer]
      - separator [ref=e13]
      - heading "Enable/disable" [level=4] [ref=e14]
      - generic [ref=e15]:
        - textbox [ref=e16]
        - button "Disable" [ref=e17] [cursor=pointer]
        - paragraph [ref=e18]: It's enabled!
        - generic [ref=e19]:
          - text: Wait for it...
          - img [ref=e20]
    - generic [ref=e22]:
      - separator [ref=e23]
      - generic [ref=e24]:
        - text: Powered by
        - link "Elemental Selenium" [ref=e25] [cursor=pointer]:
          - /url: http://elementalselenium.com/
```