aos text-embedding-service --module=ghSkge2sIUD_F00ym5sEimC63BDBuBrq4b5OcwxOjiw


# How to use

Create-Dataset
```
Send({ Target = 'hMEUOgWi97d9rGT-lHNCbm937bTypMq7qxMWeaUnMLo', Action = "Create-Dataset", Data='{"hash":"673322f20121f3dc36538578295819386f1ef2b8","list":[{"content":"This contains variable declarations","meta":{"title":"one"}},{"content":"This contains another sort of variable declarations","meta":{"title":"two"}},{"content":"This has nothing to do with variable declarations","meta":{"title":"three"}},{"content":"A random doc","meta":{"title":"four"}}]}' })
```

Search-Prompt
```
Send({ Target = 'hMEUOgWi97d9rGT-lHNCbm937bTypMq7qxMWeaUnMLo', Action = "Search-Prompt", Data = '{"dataset_hash": "673322f20121f3dc36538578295819386f1ef2b8","prompt":"variable declarations"}' })
```

# Process ID
hMEUOgWi97d9rGT-lHNCbm937bTypMq7qxMWeaUnMLo
