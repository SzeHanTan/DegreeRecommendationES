# TODO: Implement forward chaining inference engine
#
# Algorithm:
#   1. Receive facts dict  { attribute_name: bool }
#   2. Load all rules from kb/rules.py
#   3. Evaluate each rule against facts — if all conditions match, fire the rule
#   4. Accumulate score per degree and record which rules fired (trace)
#   5. Normalise scores to percentage
#   6. Sort degrees by score descending, return top N
#
# The engine must be stateless — no global state, all data passed as arguments.

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class RuleFiredRecord:
    rule_id: str
    description: str
    points_added: int


@dataclass
class DegreeScore:
    degree: str
    score: int = 0
    rules_fired: list[RuleFiredRecord] = field(default_factory=list)


def run(facts: dict[str, bool], top_n: int = 3) -> list[DegreeScore]:
    """
    Run forward chaining over all rules given a facts dictionary.
    Returns the top_n degrees ranked by score.
    """
    # TODO: Import rules from kb.rules and evaluate each one
    raise NotImplementedError("Inference engine not implemented yet")
