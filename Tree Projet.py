import os

def generate_directory_tree(root_dir, blacklist_dirs, blacklist_files, output_file_name):
    """
    Génère une représentation en arbre de la structure des répertoires,
    en excluant les dossiers spécifiés dans la blacklist et les fichiers exclus.
    
    :param root_dir: Chemin du répertoire racine du projet.
    :param blacklist_dirs: Liste des noms de dossiers à ignorer.
    :param blacklist_files: Liste des noms de fichiers à ignorer.
    :param output_file_name: Nom du fichier de sortie à exclure de l'arbre.
    :return: Chaîne représentant l'arbre des répertoires.
    """
    tree_lines = []

    def _tree(current_dir, prefix=""):
        try:
            entries = sorted(os.listdir(current_dir))
        except PermissionError:
            tree_lines.append(prefix + "└── [Permission Denied]")
            return
        # Exclure les dossiers de la blacklist et les fichiers exclus
        filtered_entries = [
            e for e in entries
            if e not in blacklist_dirs and e not in blacklist_files
        ]
        entries_count = len(filtered_entries)
        for index, entry in enumerate(filtered_entries):
            path = os.path.join(current_dir, entry)
            is_last = index == (entries_count - 1)
            connector = "└── " if is_last else "├── "
            tree_lines.append(prefix + connector + entry)
            if os.path.isdir(path):
                extension = "    " if is_last else "│   "
                _tree(path, prefix + extension)

    tree_lines.append(os.path.basename(root_dir) + "/")
    _tree(root_dir)
    return "\n".join(tree_lines)

def format_project_to_markdown(root_dir, output_file, include_extensions=None, blacklist_dirs=None, blacklist_files=None):
    """
    Parcourt un répertoire et génère un fichier Markdown avec la structure et le contenu des fichiers,
    en ignorant les dossiers et fichiers spécifiés dans les listes noires.
    
    :param root_dir: Chemin du répertoire racine du projet.
    :param output_file: Chemin du fichier de sortie Markdown.
    :param include_extensions: Liste des extensions de fichiers à inclure (ex: ['.js', '.css', '.html']).
                               Si None, tous les fichiers sont inclus.
    :param blacklist_dirs: Liste des noms de dossiers à ignorer lors de la traversée.
                           Exemple: ['node_modules', '.git']
    :param blacklist_files: Liste des noms de fichiers à ignorer lors de la traversée.
                            Exemple: ['projet_formatte.md', 'script.py']
    """
    if blacklist_dirs is None:
        blacklist_dirs = []
    if blacklist_files is None:
        blacklist_files = []

    output_file_name = os.path.basename(output_file)

    # Générer l'arbre des répertoires en excluant les fichiers spécifiés
    directory_tree = generate_directory_tree(root_dir, blacklist_dirs, blacklist_files, output_file_name)

    with open(output_file, 'w', encoding='utf-8') as outfile:
        # Écrire l'arbre des répertoires dans un bloc de code Markdown
        outfile.write("### Structure du Projet\n\n")
        outfile.write("```plaintext\n")
        outfile.write(directory_tree)
        outfile.write("\n```\n\n")

        # Parcourir les répertoires et fichiers pour ajouter leur contenu
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Modifier dirnames en place pour exclure les dossiers de la blacklist
            dirnames[:] = [d for d in dirnames if d not in blacklist_dirs]

            # Calculer le niveau de profondeur pour les en-têtes Markdown
            relative_path = os.path.relpath(dirpath, root_dir)
            if relative_path == ".":
                depth = 1
                folder_name = os.path.basename(root_dir)
            else:
                depth = relative_path.count(os.sep) + 1
                folder_name = os.path.basename(dirpath)

            # Écrire le nom du dossier avec son niveau
            outfile.write(f"{'#' * depth} {folder_name} (dossier)\n\n")

            # Trier les fichiers pour une meilleure organisation
            filenames.sort()

            for filename in filenames:
                file_path = os.path.join(dirpath, filename)

                # Ignorer le fichier de sortie et les fichiers exclus
                if filename in blacklist_files:
                    continue

                # Filtrer les fichiers si des extensions sont spécifiées
                if include_extensions:
                    if not any(filename.lower().endswith(ext.lower()) for ext in include_extensions):
                        continue

                # Lire le contenu du fichier
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e:
                    content = f"**Erreur lors de la lecture du fichier :** {e}"

                # Déterminer le langage pour la coloration syntaxique
                _, ext = os.path.splitext(filename)
                lang = ext[1:] if ext else ''

                # Écrire le nom du fichier et son contenu
                outfile.write(f"### {filename}\n\n")
                outfile.write(f"```{lang}\n{content}\n```\n\n")

            # Ajouter une ligne vide après chaque dossier
            outfile.write("\n")

if __name__ == "__main__":
    # Déterminer le chemin du répertoire où se trouve le script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Déterminer le nom du script pour l'exclure
    script_filename = os.path.basename(__file__)

    # Définir le nom du fichier de sortie dans le même répertoire
    sortie_markdown = os.path.join(script_dir, "projet_formatte.md")

    # Définir les extensions de fichiers à inclure
    extensions_a_inclure = [
        '.js', '.css', '.html', '.py', '.md', '.json', '.xml',
        '.ts', '.jsx', '.tsx', '.scss', '.sass', '.less',
        '.java', '.c', '.cpp', '.cs', '.rb', '.php', '.go',
        '.swift', '.kt', '.sql', '.sh', '.bat', '.yml', '.yaml',
        '.txt', '.ini', '.conf', '.cfg', '.env', '.vue', '.mjs', '.cjs'
    ]  # Ajoutez ou modifiez selon vos besoins

    # Définir la liste noire des dossiers à exclure
    blacklist_dirs = [
        'node_modules', '__pycache__', '.git', 'venv',
        'dist', 'build', 'tests', 'docs', 'package-lock', 'Autre', 'Input', 'Output', 'Input', 'text_files',
    ]  # Ajoutez d'autres dossiers si nécessaire

    # Définir la liste noire des fichiers à exclure
    blacklist_files = [
        os.path.basename(sortie_markdown),  # Exclure le fichier de sortie
        script_filename,  # Exclure le script lui-même
        'package-lock.json'  # Exclure package-lock.json
    ]

    # Appeler la fonction pour formater le projet
    format_project_to_markdown(
        root_dir=script_dir,
        output_file=sortie_markdown,
        include_extensions=extensions_a_inclure,
        blacklist_dirs=blacklist_dirs,
        blacklist_files=blacklist_files
    )
    print(f"Le projet a été formaté et enregistré dans {sortie_markdown}")
