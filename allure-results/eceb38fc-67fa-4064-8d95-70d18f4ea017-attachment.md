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
        - button "Remove" [ref=e12] [cursor=pointer]
        - generic [ref=e13]:
          - checkbox [ref=e14]
          - text: A checkbox
      - separator [ref=e15]
      - heading "Enable/disable" [level=4] [ref=e16]
      - generic [ref=e17]:
        - textbox [ref=e18]
        - button "Disable" [ref=e19] [cursor=pointer]
        - paragraph [ref=e20]: It's enabled!
        - generic [ref=e21]:
          - text: Wait for it...
          - img [ref=e22]
    - generic [ref=e24]:
      - separator [ref=e25]
      - generic [ref=e26]:
        - text: Powered by
        - link "Elemental Selenium" [ref=e27] [cursor=pointer]:
          - /url: http://elementalselenium.com/
```