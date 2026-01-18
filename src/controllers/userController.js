let users = [
    { id: 1, name: "Agil", email: "mochamadagils@gmail.com" }
];

exports.getUsers = (req, res) => {
     res.json(users);
};

exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({message : "Pengguna tidak ditemukan"});
    }
    res.json(user);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        email
    }

    users.push(newUser);
    res.status(201).json(newUser);
};

exports.deleteUser = (req, res) => {
    users = users.filter(u => u.id !== req.params.id);
    res.json({ message: "pengguna berhasil dihapus"});
};