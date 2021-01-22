# CodeLine is plugin for GitBook
This plugin adds line numbers for multi-line blocks and a copy button, and allows line numbers start from a arbitrary number other than 1.


### How to install?

Adds the plugin to your `book.json`, then run `gitbook install`.

```js
{
    "plugins": ["codeline"]
}
```

### How to use?

```md
{% codeline lang="cpp", startnum='20' -%}
#include <iostream>

int main(){
    std::cout << "Hello World" << std::endl;
    return 0;
}
{%- endcodeline %}
```
If you want to get rid of the copy buttons, add this section in `book.json`:

```json
"pluginsConfig": {
  "code": {
    "copyButtons": false
  }
}
```

### Attribution
This plugin is a fine-tuning one of [gitbook-plugin-code](https://github.com/davidmogar/gitbook-plugin-code) written by [David Moreno García](https://github.com/davidmogar). Since the original repo looks like no more maintained, I create a new npm package rather than submit a PR.
