# Model
```
var note = {
    id: 1,
    body: "Here is a note",
    tags: ["Tag1", "Tag2"]
}
var model = {
        tags : [], //global tag list Stings
        notes : [note], //global list of notes
        page: "home", // "edit"
        editNote: note,
        filterTag : "Tag1"
    }
}
```

# Behaviors (functions)
1. delete note
2. add note
3. save note 
4. edit note 
5. filter by tag

# View
1. filter component
2. list tags component
3. tag component
2. notes component
3. list notes 
4. note 
5. note tag list
6. note tag 
7. add note component
8. note page component
9. edit note page component
10. edit note form