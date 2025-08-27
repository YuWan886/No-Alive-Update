import os
import tomlkit
from pathlib import Path

def modify_toml_file(file_path):
    try:
        # 读取 TOML 文件
        with open(file_path, 'r', encoding='utf-8') as f:
            data = tomlkit.parse(f.read())

        # 删除指定的字段
        fields_to_remove = [
            "x-prismlauncher-loaders",
            "x-prismlauncher-mc-versions",
            "x-prismlauncher-release-type"
        ]
        for field in fields_to_remove:
            if field in data:
                del data[field]

        # 处理 [update] 表
        if 'update' not in data:
            data['update'] = tomlkit.table()  # 创建 [update] 表
        # 将 [update.curseforge] 或 [update.modrinth] 移到 [update] 表中
        if 'curseforge' in data:
            data['update']['curseforge'] = data.pop('curseforge')
        elif 'modrinth' in data:
            data['update']['modrinth'] = data.pop('modrinth')

        # 处理 [download] 部分的 url
        if 'download' in data and data['download'].get('mode') == 'metadata:curseforge':
            if 'url' in data['download']:
                del data['download']['url']

        # 写回修改后的 TOML 文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(tomlkit.dumps(data))
        print(f"Modified: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    # 获取 mods 文件夹路径
    mods_dir = Path('mods')
    if not mods_dir.exists():
        print("Error: 'mods' directory not found")
        return

    # 遍历 mods 文件夹中的所有 .toml 文件
    for toml_file in mods_dir.glob('*.toml'):
        modify_toml_file(toml_file)

if __name__ == '__main__':
    main()