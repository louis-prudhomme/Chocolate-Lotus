# App goal

Our Vue application uses the [MTG API](https://docs.magicthegathering.io/) to display Magic The Gathering cards and decks.

Our app allows users to search and see Magic cards and build decks with them.

# Functionalities

|     Functionality     |   Priority   |    Date    |
| :-------------------: | :----------: | :--------: |
|      Search card      |  Must have   | 2020-04-14 |
|     Display card      |  Must have   | 2020-04-14 |
|      Build deck       |  Must have   | 2020-04-17 |
|     Display deck      |  Must have   | 2020-04-17 |
|  Display deck stats   | Should have  | 2020-04-18 |
|  Save deck (session)  | Should have  | 2020-04-20 |
|    Gallery of Art     | Should have  | 2020-04-20 |
|    Project visuals    | Nice to have | 2020-04-12 |
|   Run in production   | Nice to have | 2020-04-12 |
| Save deck through URL | Nice to have | 2020-04-23 |
| Save deck through URL |  Dark theme  | 2020-04-23 |

# Workflow

When developing the project, some rules are to be followed **strictly**.

## Master branch

**Never** commit against the `master` branch.

The master branch should only see merges from development branches.

## Dev branches

When developing something, it **must** have its **own** development branch.

Development branches names **must** look like `dev_<functionality-name>`, where :
- the prefix `dev_` never changes
- `<functionality-name>` is the name of the functionnality where words are separated by `-`

As such, when you start coding something, create a `dev_somethin-you-code` branch. Then code and commit against it. Finally, when the thing is ready for production, merge your branch in `master`.

## Ticketting

Every commit **must** be linked to a ticket.

The Trello is [here](https://trello.com/b/SypsBzSt) ; ideally, every ticket should have a commit and vice-versa.

## Testing

**Never** commit without testing, even for a comment.

Always check if the project compiles and if the main functions plus what you just did works at least as well as it did before.

## Fix branches

When fixing a big problem, a branch **must** be created.

Although the previous rule should offer protection against big bugs, shit happens. Would a big problem arise after merging into master, a fix branch should be created. 

It should be named as `fix_<broken-thing>`.

# Recommandations

While not being mandatory, those practices should be followed during the development process.

## Commits

Try to include meaningful commit descriptions, for exemple by using the following keywords to start your descriptions.

| Keyword  |              Meaning              |                     Exemple                      |
| :------: | :-------------------------------: | :----------------------------------------------: |
|   Add    |      Create a functionality       |      `Added chocolate to the cake project`       |
|  Remove  |      Remove a functionality       |       `Removed salt from the cake project`       |
|   Fix    |           Fix an issue            | `Fixed chocolate pureness percentage (99 to 75)` |
|   Bump   | Increase the version of something |       `Bumped cacao version (0.1 to 1.2)`        |
| Refactor |            Code change            |             `Refactored cake baking`             |
| Reformat |      Refactor of formatting       |        `Reformated Knife.Vue indentation`        |
| Optimize |      Refactor of performance      |             `Optimized cake serving`             |
| Document |     Refactor of documentation     |         `Documented cake baking process`         |

Although you should probably change one thing per commit, if you want to describe several changes in the same commit, break the changes in lines :

```
Added cake baking process
Documented cake baking process
Refactored cake serving component to use new cake baking process
```

Those lines should be relatively short (~100 characters, max).
