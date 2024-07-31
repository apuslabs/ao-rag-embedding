aos text-embedding-service --module=ghSkge2sIUD_F00ym5sEimC63BDBuBrq4b5OcwxOjiw


# How to use

Create-Dataset
```
Send({ Target = ao.id, Action = "Create-Dataset", Data='{"hash":"","list":[{"content":"This contains variable declarations","meta":{"title":"one"}},{"content":"This contains another sort of variable declarations","meta":{"title":"two"}},{"content":"This has nothing to do with variable declarations","meta":{"title":"three"}},{"content":"A random doc","meta":{"title":"four"}}]}' })
```

Search-Prompt
```
Send({ Target = ao.id, Action = "Search-Prompt", Data = '{"dataset_hash": "673322f20121f3dc36538578295819386f1ef2b8","prompt":"variable declarations"}' })
```