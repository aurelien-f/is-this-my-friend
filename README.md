# Test technique

Le programme prend une liste d'amitiée et une question en entrée.

Le format est le suivant:
X lignes de lien d'amitiée `<nom1> est ami(e) avec <nom2>` ou  `je suis ami avec <nom2>` ou  `<nom1> est ami(e) avec moi`
un séparateur `---`
Une question `Est-ce que <nom> est mon ami(e)`

Axiome: `l'ami de mon ami est mon ami`

Le but est de répondre à la question par oui ou par non.

### Notes:

* Il y a unicitée des prénoms
* Les liens d'amitiés sont réciproques et transitifs

## Exemples

```py
is_friend("""
Benjamin est ami avec Paul
Sophie est amie avec moi
Je suis ami avec Benjamin
---
Est-ce que Sophie est mon amie ?""")  # return True;
```

```py
is_friend("""
Benjamin est ami avec Paul
Frank est ami avec Paul
Mathieu est ami avec Aurore
Sophie est amie avec moi
Je suis ami avec Benjamin
---
Est-ce que Mathieu est mon ami ?""")  # return False;
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
