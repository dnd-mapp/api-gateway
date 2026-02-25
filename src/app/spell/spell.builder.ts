import { SpellDto } from './dto';

export class SpellBuilder {
    private readonly spell = new SpellDto();

    public build() {
        return this.spell;
    }

    public withId(id: string) {
        this.spell.id = id;
        return this;
    }

    public withName(name: string) {
        this.spell.name = name;
        return this;
    }
}
